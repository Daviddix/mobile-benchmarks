const express = require("express")
const { onlyAdminAllowed } = require("../middlewares/admin.middlewares")
const { getAllReports, reportInaccurateInfo } = require("../controllers/report.controller")
const { useAuth } = require("../middlewares/user.middlewares")

const reportRouter = express.Router()

// /api/report
reportRouter.get("/all-reports", onlyAdminAllowed, getAllReports)
reportRouter.post("/make-report", useAuth, reportInaccurateInfo)

module.exports = reportRouter