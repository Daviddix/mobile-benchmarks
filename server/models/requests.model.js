const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
   requestType : {
         type: String,
         required: true,
         enum: ["Phone", "Game"]
   },
   requestItem: {
         type: String,
         required: true,
         trim: true,    
   },
   userInfo : {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "Users"
   },
})

const requestModel = mongoose.model("Requests", requestSchema)

module.exports = requestModel