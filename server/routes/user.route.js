const express = require("express")
const { createNewUser, createNewUserFromGoogle, getUserDetails, logUserIn, logUserInFromGoogle, verifyOtp } = require("../controllers/user.controller")
const { useAuth } = require("../middlewares/user.middlewares")

const userRouter = express.Router()

userRouter.post("/signup", createNewUser)
userRouter.post("/signup/google", createNewUserFromGoogle)
userRouter.post("/login", logUserIn)
userRouter.post("/login/google", logUserInFromGoogle)
userRouter.get("/info", useAuth , getUserDetails)
userRouter.post("/verify-otp", verifyOtp)
// userRouter.get("/logout", getGameInfo)

module.exports = userRouter