const express = require("express")
const { addNewGame, getAllGames, getGameInfo } = require("../controllers/game.controller")
const { limiter } = require("../middlewares/rate-limit-middlewares")

const gameRouter = express.Router()

gameRouter.post("/add", addNewGame)
gameRouter.get("/get-all", getAllGames)
gameRouter.get("/:id", getGameInfo)

module.exports = gameRouter