const express = require("express")
const { addNewGame, getAllGames, getGameInfo, searchForGame } = require("../controllers/game.controller")

const gameRouter = express.Router()

gameRouter.post("/add", addNewGame)
gameRouter.get("/get-all", getAllGames)
gameRouter.get("/search", searchForGame)
gameRouter.get("/:id", getGameInfo)

module.exports = gameRouter