const mongoose = require("mongoose")

const gameDataSchema = new mongoose.Schema({
    fps : {type : Number},
    frameRate : {type : String},
    playStoreDownloadLink : {type : String},
    iosDownloadLink : {type : String},
    graphicsQuality : {type : String},
    batteryUsagePerHour : {type : Number}
})

const compatibleGameSubSchema = new mongoose.Schema({
    gameCoverImage : {type : String},
    gameName : {type : String},
    gameCompatibilityRating : {type : Number},
    gameDescription : {type : String},
    gameData : gameDataSchema
})

const compatibleGameSchema = new mongoose.Schema({
    phone : {
        type : mongoose.Schema.Types.ObjectId, 
        required : true,
        ref : "Phones"
    },
    compatibleGamesInfo : [{
        type : compatibleGameSubSchema,
        required : true
    }]
})

const compatibleGameModel = mongoose.model("CompatibleGames", compatibleGameSchema)

module.exports = compatibleGameModel