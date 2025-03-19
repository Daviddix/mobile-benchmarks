const mongoose = require("mongoose")

const minimumRequirementSchema = new mongoose.Schema({
    operatingSystem : {type: String, required : true},
    processor : {type : String, required : true},
    gpu : {type : String, required : true},
    ram : {type : Number, required : true},
    storageSize : {type : Number, required : true},
    additionalFeatures : {type : String, required : true}
})

const recommendedRequirementSchema = new mongoose.Schema({
    operatingSystem : {type: String, required : true},
    processor : {type : String, required : true},
    gpu : {type : String, required : true},
    ram : {type : Number, required : true},
    storageSize : {type : Number, required : true},
    additionalFeatures : {type : String, required : true}
})

const moreInfoSchema = new mongoose.Schema({
    gameRequirements : {
        minimumRequirements : {
            type : minimumRequirementSchema,
            required : true
        },
        recommendedRequirements : {
            type : recommendedRequirementSchema,
            required : true
        }
    },
    gameScreenshots : {
        type : [String]
    }
})



const gameSchema = new mongoose.Schema({
    gameName : {
        type : String, 
        required : [true, "Name of game is required"],
        trim : true
    },
    gameCategory : {
        type : String,
        required : true
    },
    gameSize : {
        type : Number,
        required : true
    },
    gamePlatform : {
        type : String,
        required : true
    },
    gameCoverImage :{
        type : String,
        required : true
    },
    gameDescription : {
        type : String,
        required : true
    },
    gameYearOfRelease : {
        type : Number,
        required : true
    },
    gameRating : {
        type : [Number],
        validate : {
            validator : function(arr){
                return arr.length === 2
            },
            message: 'display must be a tuple of [number, number]'
        }
    },
    androidDownloadLink : {
        type : String,
        required : true
    },
    iosDownloadLink : {
        type : String,
        required : true
    },
    moreInfo : {
        type : moreInfoSchema,
        required : true
    }
})

const gameModel = mongoose.model("Games", gameSchema)

module.exports = gameModel