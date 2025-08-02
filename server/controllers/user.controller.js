const {
  duplicateUsername,
  duplicateEmail,
  noBodyDataError,
  unknownError,
  googleTokenError,
  userNotFoundInDataBase,
  switchToGoogleAccount,
  invalidDataSubmitted,
  otpNotValid,
  wrongPassword,
} = require("../JsonResponses/error");
const { otpSentToUser } = require("../JsonResponses/success");
const userModel = require("../models/user.model");
const {
  checkForDuplicateUsername,
  checkForDuplicateEmail,
  generateJwtToken,
} = require("../utils/user.utils");
const timeBeforeItExpires = 90000000000 * 300;
const saltRounds = 10;
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const { generateOtp, sentOtpEmailWithResend, OtpIsVerified } = require("../utils/otp.utils");
const otpModel = require("../models/otp.model");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function createNewUser(req, res) {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(401).json(noBodyDataError);
    }

    if(typeof email !== "string" || typeof email !== "string" || typeof password !== "string"){
      return res.status(401).json(invalidDataSubmitted)
    }
    const isDuplicateUsername = await checkForDuplicateUsername(username);

    const isDuplicateEmail = await checkForDuplicateEmail(email);

    if (isDuplicateUsername) {
      return res.status(400).json(duplicateUsername);
    }

    if (isDuplicateEmail) {
      return res.status(400).json(duplicateEmail);
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userMade = await userModel.create({
      email,
      username,
      password: hashedPassword,
      authProvider: "local",
      status : "pending"
    });

    const otpNumber = generateOtp()

    const userOtp = await otpModel.create({
      userId : userMade._id,
      otp : otpNumber
    })

    await sentOtpEmailWithResend(userMade.email, userOtp.otp, userMade.username)

    res.cookie("userIdAwaitingOtp", userMade._id, {
      httpOnly: true,
      maxAge: timeBeforeItExpires,
      path: "/",
      secure: true, 
      sameSite: "Strict",
    });

    res.status(201).json({...otpSentToUser, email : userMade.email});
  } catch (err) {
    console.log(err);
    res.status(400).json(unknownError);
  }
}

async function logUserIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json(noBodyDataError);
      return;
    }

    const userInDb = await userModel.findOne({ email : String(email) });
    if (!userInDb) {
      return res.status(404).json(userNotFoundInDataBase);
    }

    if (userInDb && userInDb.googleId !== null) {
      return res.status(404).json(switchToGoogleAccount);
    }

    const passwordIsCorrect = await bcrypt.compare(password, userInDb.password);

    if (!passwordIsCorrect) {
      return res.status(401).json(wrongPassword);
    }

     const otpNumber = generateOtp()

    const userOtp = await otpModel.create({
      userId : userInDb._id,
      otp : otpNumber
    })

    await sentOtpEmailWithResend(userInDb.email, userOtp.otp, userInDb.username)

    res.cookie("userIdAwaitingOtp", userInDb._id, {
      httpOnly: true,
      maxAge: timeBeforeItExpires,
      path: "/",
      secure: true, 
      sameSite: "Strict",
    });

    res.status(201).json({...otpSentToUser, email : userInDb.email});

  } catch (e) {
    console.log(e);
    res.status(400).json(unknownError);
  } 
}

async function getUserDetails(req, res) {
  try {
    const id = req.user.userId;
    const userInDb = await userModel.findById(id, ["username", "email"]);
    if (!userInDb) {
      return res.status(404).json(userNotFoundInDataBase);
    }
    res.status(200).json(userInDb);
  } catch (err) {
    res.status(500).json(unknownError);
  }
}

async function createNewUserFromGoogle(req, res) {
  const { credential } = req.body; // This is the ID token from Google

  if (!credential) {
    return res.status(400).json(googleTokenError);
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload;

    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json(duplicateEmail);
    }

    // Create a new user
    user = await userModel.create({
      email,
      username: name, // or generate a unique username
      googleId: sub,
      authProvider: "google",
      password: null, // Or mark account as Google-only
    });

    // Generate token
    const userToken = await generateJwtToken(user._id);

    res.cookie("jwt", userToken, {
      httpOnly: true,
      maxAge: timeBeforeItExpires,
      path: "/",
      secure: true, 
      sameSite: "Strict",
    });

    const userInfo = {
      _id : user._id,
      email : user.email,
      username : user.username,
    }

    res.status(200).json(userInfo);

    return res.status(200).json(userInfo);
  } catch (err) {
    console.error("Google login error:", err);
    return res.status(500).json(unknownError);
  }
}

async function logUserInFromGoogle(req, res) {
  const { credential } = req.body; // This is the ID token from Google

  if (!credential) {
    return res.status(400).json(googleTokenError);
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email } = payload;

    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json(userNotFoundInDataBase);
    }

    // Generate token
    const userToken = await generateJwtToken(user._id);

    res.cookie("jwt", userToken, {
      httpOnly: true,
      maxAge: timeBeforeItExpires,
      path: "/",
      secure: true, 
      sameSite: "Strict",
    });

    const userInfo = {
      _id : user._id,
      email : user.email,
      username : user.username,
    }

    res.status(200).json(userInfo);
  } catch (err) {
    console.error("Google login error:", err);
    return res.status(500).json(unknownError);
  }
}

async function verifyOtpForSignup(req, res){
  try {
    const userId = req.cookies.userIdAwaitingOtp

    const {otpEntered} = req.body

    if(!userId || !otpEntered){
      return res.status(400).json(noBodyDataError)
    }

    const otpHasBeenVerified = await OtpIsVerified(userId, otpEntered)

    if(!otpHasBeenVerified){
      return res.status(401).json(otpNotValid)
    }

    console.log("The OTP has been verified")

    res.cookie("userIdAwaitingOtp", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
      secure: true, 
      sameSite: "Strict",
    });

    const userInDb = await userModel.findById(userId);

    if (!userInDb) {
      return res.status(404).json(userNotFoundInDataBase);
    }

    const userToken = await generateJwtToken(userInDb._id);

    res.cookie("jwt", userToken, {
      httpOnly: true,
      maxAge: timeBeforeItExpires,
      path: "/",
      secure: true, 
      sameSite: "Strict",
    });

    userInDb.status = "active"

    await userInDb.save()

    const userInfo = {
      _id: userInDb._id,
      email: userInDb.email,
      username: userInDb.username,
    }

    res.status(200).json(userInfo);
    
  } catch (error) {
    console.log(error)
    res.status(500).json(unknownError)
  }
}


async function verifyOtpForLogin(req, res){
  try {
    const userId = req.cookies.userIdAwaitingOtp

    const {otpEntered} = req.body

    if(!userId || !otpEntered){
      return res.status(400).json(noBodyDataError)
    }

    const otpHasBeenVerified = await OtpIsVerified(userId, otpEntered)

    if(!otpHasBeenVerified){
      return res.status(401).json(otpNotValid)
    }

    console.log("The OTP has been verified")

    res.cookie("userIdAwaitingOtp", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
      secure: true, 
      sameSite: "Strict",
    });

    const userInDb = await userModel.findById(userId);

    if (!userInDb) {
      return res.status(404).json(userNotFoundInDataBase);
    }

    const userToken = await generateJwtToken(userInDb._id);

    res.cookie("jwt", userToken, {
      httpOnly: true,
      maxAge: timeBeforeItExpires,
      path: "/",
      secure: true, 
      sameSite: "Strict",
    });

    const userInfo = {
      _id: userInDb._id,
      username: userInDb.username,
      email: userInDb.email,
    }

    res.status(200).json(userInfo);
    
  } catch (error) {
    console.log(error)
    res.status(500).json(unknownError)
  }
}

module.exports = {
  createNewUser,
  createNewUserFromGoogle,
  getUserDetails,
  logUserIn,
  logUserInFromGoogle,
  verifyOtpForSignup,
  verifyOtpForLogin
};
