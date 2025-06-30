const gameModel = require("../models/game.model")

async function addNewGame(req, res){
    try{
        const gameInfo = req.body

        if(Object.keys(gameInfo).length == 0){
            res.status(400).json({type : "error", message : "Couldn't add game"})
        }

        const newGameAdded = await gameModel.create(gameInfo)

        res.status(201).json(newGameAdded)
    }
    catch(err){
        console.log("An error occurred", err) 
        res.status(500).json({type : "error", message : "Server Error"})
    } 
}

async function getAllGames(req, res){
    try{
        const allGames = await gameModel.find({}).limit(20) 

        res.status(200).json(allGames)
    }
    catch(err){
        console.log("An error occurred", err) 
        res.status(500).json({type : "error", message : "Couldn't get games, please try again"})
    } 
}

async function getGameInfo(req, res){
    try{
        const {id} = req.params
        const gameInfo = await gameModel.findById(id).populate("moreInfo.supportedDevices")

        res.status(200).json(gameInfo)
    }
    catch(err){
        console.log("An error occurred", err) 
        res.status(500).json({type : "error", message : "Couldn't get game info, please try again"})
    } 
}

module.exports = {getGameInfo, getAllGames, addNewGame}