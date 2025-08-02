const { invalidDataSubmitted, noBodyDataError, unknownError, imageUploadError } = require("../JsonResponses/error")
const { gameSubmitted } = require("../JsonResponses/Success")
const submittedGameModel = require("../models/submitted-game.model");
const { changeBase64ToCloudinaryUrl } = require("../utils/submitted-game.utils");

async function submitGameForReview(req, res){
    try{
        const {gameInfo, phoneInfo} = req.body
        
        const userId = req.user.userId

        
        if(gameInfo.length === 0 || phoneInfo.phoneName.trim == ""){
            return res.status(400).json(invalidDataSubmitted)
        }

        for (const gameData of gameInfo) {
          try { 
            const newGameFpsImage = await changeBase64ToCloudinaryUrl(gameData.gameFps[1]);
            console.log(newGameFpsImage);
            const newFrameRateImage = await changeBase64ToCloudinaryUrl(gameData.gameFrameRate[1]);
            console.log(newFrameRateImage);
            const newGameGraphicsImage = await changeBase64ToCloudinaryUrl(gameData.gameGraphics[1]);
            console.log(newGameGraphicsImage);

            gameData.gameFps[1] = newGameFpsImage;
            gameData.gameFrameRate[1] = newFrameRateImage;
            gameData.gameGraphics[1] = newGameGraphicsImage;
          } catch (err) {
            console.log(err);
            return res.status(500).json(imageUploadError);
          }
        }

        const submittedGame = {
            phoneInfo: phoneInfo,
            gameInfo: gameInfo,
            userInfo: userId
        }

        const submittedGameInfo = await submittedGameModel.create(submittedGame)

        res.status(201).json(gameSubmitted)
    }
    catch(err){
        console.log(err)
        res.status(500).json({easy : err.message, generic : unknownError})
    }
}

module.exports = {submitGameForReview}