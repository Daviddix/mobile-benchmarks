const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // OTP expires after 10 minutes
  },
})

const otpModel = mongoose.model("OTP", otpSchema)

module.exports = otpModel