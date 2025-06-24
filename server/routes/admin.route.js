const express = require("express")
const { onlyAdminAllowed } = require("../middlewares/admin.middlewares")
const { getAllSubmissions, getSubmittedGamesFromSubmissionId } = require("../controllers/admin.controller")

const adminRouter = express.Router()

// /api/admin
adminRouter.get("/submissions", onlyAdminAllowed,  getAllSubmissions)
adminRouter.get("/submissions/:submissionId", onlyAdminAllowed,  getSubmittedGamesFromSubmissionId)

// userRouter.get("/submissions/:id", createNewUserFromGoogle)
// userRouter.post("/submission/approve/:id", logUserIn)
// userRouter.post("/submission/decline/:id", logUserInFromGoogle)
// userRouter.get("/info", useAuth , getUserDetails)


module.exports = adminRouter