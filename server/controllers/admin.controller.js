const { unknownError } = require("../JsonResponses/error")
const submittedGameModel = require("../models/submitted-game.model")

async function getAllSubmissions(req, res){
    try{
        const allSubmissions = await submittedGameModel.find({}).limit(10).populate("userInfo", ["username"])

        res.status(200).json(allSubmissions)
    }catch(err){
        res.status(500).json(unknownError)
    }
}

module.exports = {
    getAllSubmissions
}