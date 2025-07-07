const {
  duplicateUsername,
  duplicateEmail,
  noBodyDataError,
  unknownError,
  googleTokenError,
  userNotFoundInDataBase,
  switchToGoogleAccount,
} = require("../JsonResponses/error");
const { userCreated, loginSuccessful, reportSubmitted } = require("../JsonResponses/Success");
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

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function createNewUser(req, res) {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(401).json(noBodyDataError);
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
    });

    const userToken = await generateJwtToken(userMade._id);

    const userInfo = {
      username : userMade.username,
      _id : userMade._id,
    }

    res.cookie("jwt", userToken, {
      httpOnly: true,
      maxAge: timeBeforeItExpires,
      path: "/",
      secure: true,
      sameSite: "None",
    });

    res.status(201).json(userInfo);
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

    const userInDb = await userModel.findOne({ email });
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

    const userToken = await generateJwtToken(userInDb._id);

    res.cookie("jwt", userToken, {
      httpOnly: true,
      maxAge: timeBeforeItExpires,
      path: "/",
      secure: true,
      sameSite: "None",
    });

    const userInfo = {
      _id : userInDb._id,
      username : userInDb.username,
    }

    res.status(200).json(userInfo);
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
      secure: false,
      sameSite: "Lax",
    });

    return res.status(200).json(userCreated);
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
      sameSite: "None",
    });

    res.status(200).json(loginSuccessful);
  } catch (err) {
    console.error("Google login error:", err);
    return res.status(500).json(unknownError);
  }
}

module.exports = {
  createNewUser,
  createNewUserFromGoogle,
  getUserDetails,
  logUserIn,
  logUserInFromGoogle
};
