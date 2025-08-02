const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({
   reportType : {
         type: String,
         required: true,
         enum: ["Phones", "Games"]
   },
   reportTypeId : {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         refPath: 'reportType'
   },
   reasonForReport: {
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

const reportModel = mongoose.model("Reports", reportSchema)

module.exports = reportModel