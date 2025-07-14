const express = require("express")
const { addNewPhone, getAllPhones, getPhoneInfo, searchForPhone, transformImage, scrapePhoneInfo } = require("../controllers/phone.controller")
const { onlyAdminAllowed } = require("../middlewares/admin.middlewares")

const phoneRouter = express.Router()

phoneRouter.post("/add", addNewPhone)
phoneRouter.get("/get-all", getAllPhones)
phoneRouter.get("/search", searchForPhone)
phoneRouter.get("/info/:id", getPhoneInfo)
phoneRouter.post("/transform-image", onlyAdminAllowed, transformImage)
phoneRouter.post("/scrape-phone-info", onlyAdminAllowed, scrapePhoneInfo)

module.exports = phoneRouter