const mongoose = require("mongoose")

const compatibleGameSchema = new mongoose.Schema({
    phone : {
        type : mongoose.Schema.Types.ObjectId, 
        required : true,
        ref : "Phones"
    },
    compatibleGamesInfo: [{
    game: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Games", 
        required: true 
    },

    gameCompatibilityRating: { 
        type: Number, 
        required: true 
    },

    gamePerformanceStats: {
        fps: { type: Number },
        frameRate: { type: String },
        graphicsQuality: { type: String },
        batteryUsagePerHour: { type: Number }
    }
    }]
}, { timestamps: true } )

const compatibleGameModel = mongoose.model("CompatibleGames", compatibleGameSchema)

module.exports = compatibleGameModel