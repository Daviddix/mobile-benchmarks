const express = require("express")
const { createNewUser, createNewUserFromGoogle, getUserDetails } = require("../controllers/user.controller")
const { useAuth } = require("../middlewares/user.middlewares")

const userRouter = express.Router()

userRouter.post("/signup", createNewUser)
userRouter.post("/signup/google", createNewUserFromGoogle)
userRouter.get("/info", useAuth , getUserDetails)
// userRouter.get("/login", getAllGames)
// userRouter.get("/logout", getGameInfo)

module.exports = userRouter