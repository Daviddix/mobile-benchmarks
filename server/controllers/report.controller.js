const { unknownError, missingData, itemNotFound } = require("../JsonResponses/error");
const { reportSubmitted } = require("../JsonResponses/success");
const reportModel = require("../models/reports.model")


async function getAllReports(req, res){
    try{
        const allReports = await reportModel.find({}).limit(10).populate("userInfo", ["username"])


        for (const report of allReports) {
      if (report.reportType === "Phones") {
        await report.populate("reportTypeId", ["phoneName", "phoneCoverImage"]);
      } else if (report.reportType === "Games") {
        await report.populate("reportTypeId", ["gameName", "gameCoverImage"]);
      }
    }

        res.status(200).json(allReports)
    }catch(err){
        res.status(500).json({
          specific : err,
          generic : unknownError})
    }
}

async function reportInaccurateInfo(req, res) {
  try {
    const { reportType, reasonForReport, reportTypeId } = req.body;
    const userId = req.user.userId;

    if (!reportType || !reasonForReport) {
      return res.status(400).json(noBodyDataError);
    }

    const newReport = await reportModel.create({
      userInfo: userId,
      reportType,
      reportTypeId,
      reasonForReport,
    });

    res.status(201).json(reportSubmitted);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
          specific : err,
          generic : unknownError})
  }
}

async function resolveReport(req, res){
    try{
        const {reportId} = req.params;

        if(!reportId){
            return res.status(400).json(missingData);
        }

        const report = await reportModel.findById(reportId);

        if(!report){
            return res.status(404).json(itemNotFound);
        }

        await reportModel.findByIdAndDelete(reportId);

        res.status(200).json({message : "Report resolved successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({
          specific : err,
          generic : unknownError})
    }
}

module.exports = {
    getAllReports,
    reportInaccurateInfo,
    resolveReport
}