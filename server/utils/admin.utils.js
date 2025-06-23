const userModel = require("../models/user.model")

async function getEmailFromUserId(userId) {
  const user = await userModel.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user.email;
}

module.exports = {getEmailFromUserId}