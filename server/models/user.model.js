const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique : true
  },

  password: {
    type: String,
    default: null, // null for Google users
  },

  googleId: {
    type: String,
    default: null, // non-null for Google users
  },

  authProvider: {
    type: String,
    enum: ["local", "google"],
    required: true,
    default: "local",
  },

});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
