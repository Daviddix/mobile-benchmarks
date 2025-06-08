const { invalidDataSubmitted, noBodyDataError } = require("../JsonResponses/error")
const submittedGameModel = require("../models/submitted-game.model")

async function submitGameForReview(req, res){
    try{
        const {gameInfo, phoneInfo} = req.body

        // const userId = req.user._id
        const userId = "680accd55d9817ef60b87fd9"

        if(!gameInfo || !phoneInfo || !userId){
            return res.status(400).json(noBodyDataError)
        }

        const submittedGame = {
            phoneInfo: phoneInfo,
            gameInfo: gameInfo,
            userInfo: userId
        }

        console.log(submittedGame)

        // const submittedGameInfo = await submittedGameModel.create(submittedGame)

        res.status(201).json(submittedGameInfo)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err.message)
    }
}

module.exports = {submitGameForReview}