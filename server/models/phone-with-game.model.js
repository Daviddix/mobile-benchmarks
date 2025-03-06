const mongoose = require("mongoose")

const moreInfoSchema = new mongoose.Schema({
    generalCompatibility: { type: Number},
    gpu: { type: String },
    averageRating : {
        type : [String],
        validate : {
            validator : function(arr){
                return arr.length === 2
            },
            message: 'display must be a tuple of [string, string]'
        }
    },
    geekBench : {type : Number},
    anTutu : {type : Number},
    threeDMark : {type : Number}
})

const gameDataSchema = new mongoose.Schema({
    fps : {type : Number},
    frameRate : {type : String},
    playStoreDownloadLink : {type : String},
    iosDownloadLink : {type : String},
    graphicsQuality : {type : String},
    batteryUsagePerHour : {type : Number}
})

const compatibleGameSchema = new mongoose.Schema({
    gameCoverImage : {type : String},
    gameCompatibilityRating : {type : Number},
    gameDescription : {type : String},
    gameData : gameDataSchema
})

const phoneWithGameSchema = new mongoose.Schema({
    phoneName : {
        type : String, 
        required : [true, "Name of phone is required"],
        trim : true
    },
    phoneChipset : {
        type : String,
        required : true
    },
    phoneCoverImage : {
        type : String,
        required : true
    },
    phoneDisplay: {
        type: [String], 
        validate: {
            validator: function(arr) {
                return arr.length === 2; // Ensures exactly 2 elements
            },
            message: 'display must be a tuple of [string, string]'
    }},
    phoneMemory : {
        type: [Number], 
        validate: {
            validator: function(arr) {
                return arr.length === 2; // Ensures exactly 2 elements
            },
            message: 'memory must be a tuple of [number, number]'
    }},
    moreInfo : {
        type : moreInfoSchema,
        required : true
    },
    compatibleGameInfo : {
        type : [compatibleGameSchema],
        required : true
    }
})

const phoneWithGame = mongoose.model("PhoneWithGames", phoneWithGameSchema)

module.exports = phoneWithGame