const express = require("express")
const { addNewCompatibleGame } = require("../controllers/compatible-game.controller")

const phoneRouter = express.Router()

phoneRouter.post("/add", addNewCompatibleGame)

module.exports = phoneRouter