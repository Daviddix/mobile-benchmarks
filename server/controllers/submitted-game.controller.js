const { invalidDataSubmitted, noBodyDataError, unknownError } = require("../JsonResponses/error")
const { gameSubmitted } = require("../JsonResponses/Success")
const submittedGameModel = require("../models/submitted-game.model")

async function submitGameForReview(req, res){
    try{
        console.log(req.body)
        const {gameInfo, phoneInfo} = req.body

        const userId = req.user._id

        if(!gameInfo || !phoneInfo || !userId){
            return res.status(400).json(noBodyDataError)
        }

        const submittedGame = {
            phoneInfo: phoneInfo,
            gameInfo: gameInfo,
            userInfo: userId
        }

        // const submittedGameInfo = await submittedGameModel.create(submittedGame)

        res.status(201).json(gameSubmitted)
    }
    catch(err){
        console.log(err)
        res.status(500).json({easy : err.message, generic : unknownError})
    }
}

module.exports = {submitGameForReview}