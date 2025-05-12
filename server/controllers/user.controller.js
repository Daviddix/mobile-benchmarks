const {
  duplicateUsername,
  duplicateEmail,
  noBodyDataError,
  unknownError,
  googleTokenError,
  userNotFoundInDataBase,
} = require("../JsonResponses/error");
const { userCreated } = require("../JsonResponses/Success");
const userModel = require("../models/user.model");
const {
  checkForDuplicateUsername,
  checkForDuplicateEmail,
  generateJwtToken,
} = require("../utils/user.utils");
const timeBeforeItExpires = 90000000000 * 300
const saltRounds = 10;
const bcrypt = require("bcryptjs")
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
      authProvider : "local"
    });

    const userToken = await generateJwtToken(userMade._id);

    res.cookie("jwt", userToken, {
      httpOnly: true,
      maxAge: timeBeforeItExpires,
      path: "/",
      secure: true,
      sameSite: "None",
    });

    res.status(201).json(userCreated);
  } catch (err) {
    console.log(err)
    res.status(400).json(unknownError);
  }
}

async function getUserDetails(req, res){
  try{
    const id = req.user.userId
    const userInDb = await userModel.findById(id, ["username"])
    if(!userInDb){
        return res.status(404).json(userNotFoundInDataBase)
    }
    res.status(200).json(userInDb)
    }
    catch(err){
        res.status(500).json(unknownError)
    }
}

async function createNewUserFromGoogle(req, res){
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

    if(user){
      return res.status(400).json(duplicateEmail);
    }

      // Create a new user
      user = await userModel.create({
        email,
        username: name, // or generate a unique username
        googleId: sub,
        authProvider : "google",
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
  } 
  catch (err) {
    console.error("Google login error:", err);
    return res.status(500).json(unknownError);
  }
}

module.exports = {createNewUser, createNewUserFromGoogle, getUserDetails}