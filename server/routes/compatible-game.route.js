const express = require("express")
const { addNewCompatibleGame, getCompatibleGamesForPhone } = require("../controllers/compatible-game.controller")

const phoneRouter = express.Router()

phoneRouter.post("/add", addNewCompatibleGame)
phoneRouter.get("/get-games/:phoneId", getCompatibleGamesForPhone)

module.exports = phoneRouter