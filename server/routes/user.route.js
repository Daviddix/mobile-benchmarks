const express = require("express")
const { createNewUser, createNewUserFromGoogle } = require("../controllers/user.controller")

const userRouter = express.Router()

userRouter.post("/signup", createNewUser)
userRouter.post("/signup/google", createNewUserFromGoogle)
// userRouter.get("/login", getAllGames)
// userRouter.get("/logout", getGameInfo)

module.exports = userRouter