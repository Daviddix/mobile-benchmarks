const express = require("express")
const { addNewGame, getAllGames, getGameInfo } = require("../controllers/game.controller")

const gameRouter = express.Router()

gameRouter.post("/add", addNewPhone)
gameRouter.get("/get-all", getAllPhones)
gameRouter.get("/:id", getGameInfo)

module.exports = gameRouter