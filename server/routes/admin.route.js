const express = require("express")
const { onlyAdminAllowed } = require("../middlewares/admin.middlewares")
const { getAllSubmissions, getSubmittedGamesFromSubmissionId, approveSubmission, declineSubmission } = require("../controllers/admin.controller")

const adminRouter = express.Router()

// /api/admin
adminRouter.get("/submissions", onlyAdminAllowed,  getAllSubmissions)
adminRouter.get("/submissions/:submissionId", onlyAdminAllowed,  getSubmittedGamesFromSubmissionId)
adminRouter.delete("/submissions/approve/:submissionId", onlyAdminAllowed, approveSubmission)
adminRouter.delete("/submissions/decline/:submissionId", onlyAdminAllowed, declineSubmission)

// userRouter.get("/submissions/:id", createNewUserFromGoogle)
// userRouter.post("/submission/approve/:id", logUserIn)
// userRouter.post("/submission/decline/:id", logUserInFromGoogle)
// userRouter.get("/info", useAuth , getUserDetails)


module.exports = adminRouter