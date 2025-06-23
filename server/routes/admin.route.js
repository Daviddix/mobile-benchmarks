const express = require("express")
const { onlyAdminAllowed } = require("../middlewares/admin.middlewares")
const { getAllSubmissions } = require("../controllers/admin.controller")

const adminRouter = express.Router()

adminRouter.get("/submissions", onlyAdminAllowed,  getAllSubmissions)

// userRouter.get("/submissions/:id", createNewUserFromGoogle)
// userRouter.post("/submission/approve/:id", logUserIn)
// userRouter.post("/submission/decline/:id", logUserInFromGoogle)
// userRouter.get("/info", useAuth , getUserDetails)


module.exports = adminRouter