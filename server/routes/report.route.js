const express = require("express")
const { onlyAdminAllowed } = require("../middlewares/admin.middlewares")
const { getAllReports, reportInaccurateInfo, resolveReport } = require("../controllers/report.controller")
const { useAuth } = require("../middlewares/user.middlewares")
const { rateLimitEndpoint } = require("../middlewares/rate-limit-middlewares")

const reportRouter = express.Router()

// /api/report
reportRouter.get("/all-reports", onlyAdminAllowed, getAllReports)
reportRouter.post("/make-report", useAuth, rateLimitEndpoint, reportInaccurateInfo)
reportRouter.put("/resolve/:reportId", onlyAdminAllowed, resolveReport)

module.exports = reportRouter