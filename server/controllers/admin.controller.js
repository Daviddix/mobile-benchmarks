const { unknownError, noBodyDataError, invalidDataSubmitted } = require("../JsonResponses/error")
const submittedGameModel = require("../models/submitted-game.model")

async function getAllSubmissions(req, res){
    try{
        const allSubmissions = await submittedGameModel.find({}).limit(10).populate("userInfo", ["username"])

        res.status(200).json(allSubmissions)
    }catch(err){
        res.status(500).json(unknownError)
    }
}

async function getSubmittedGamesFromSubmissionId(req, res){
  try{
    const {submissionId} = req.params;

    if(!submissionId){
      return res.status(400).json(noBodyDataError);
    }

    const submittedGame = await submittedGameModel.findById(submissionId).populate("userInfo", ["username"])

    if(!submittedGame){
      return res.status(404).json(invalidDataSubmitted);
    }

    res.status(200).json(submittedGame);
  }
  catch(err){
    console.log(err)
    res.status(500).json({easy : err.message, generic : unknownError})
  }
}

module.exports = {
    getAllSubmissions,
    getSubmittedGamesFromSubmissionId
}