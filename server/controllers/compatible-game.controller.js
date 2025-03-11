const compatibleGameModel = require("../models/compatible-game.model")

async function addNewCompatibleGame(req, res){
    try{
        const compatibleGameInfo = req.body

        if(Object.keys(compatibleGameInfo).length == 0){
            res.status(400).json({type : "error", message : "No compatible game info found"})
        }

        const newCompatibleGameAdded = await compatibleGameModel.create(compatibleGameInfo)

        res.status(201).json(newCompatibleGameAdded)
    }
    catch(err){
        console.log("An error occurred when trying to add a compatible game", err) 
        res.status(500).json({type : "error", message : "Server Error"})
    } 
}

module.exports = {addNewCompatibleGame}