const express = require("express")
const { addNewPhone, getAllPhones, getPhoneInfo, searchForPhone } = require("../controllers/phone.controller")

const phoneRouter = express.Router()

phoneRouter.post("/add", addNewPhone)
phoneRouter.get("/get-all", getAllPhones)
phoneRouter.get("/search", searchForPhone)
phoneRouter.get("/info/:id", getPhoneInfo)

module.exports = phoneRouter