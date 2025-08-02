const { unknownError } = require("../JsonResponses/error")

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
        res.status(500).json({
            generic : unknownError,
            specific : err
        })
    } 
}

async function getCompatibleGamesForPhone(req, res){
    try{
        const {phoneId} = req.params
        const compatibleGames = await compatibleGameModel.findOne({phone : phoneId}).populate({
            path: 'compatibleGamesInfo.game', // Path to nested field
            select: '_id gameName gameCoverImage gameDescription iosDownloadLink androidDownloadLink', // Optional: select specific fields
  })

        res.status(200).json(compatibleGames)
    } 
    catch(err){
        console.log("An error occurred", err) 
        res.status(500).json({type : "error", message : "Couldn't get compatible games for your phone, please try again"})
    } 
}
module.exports = {addNewCompatibleGame, getCompatibleGamesForPhone}