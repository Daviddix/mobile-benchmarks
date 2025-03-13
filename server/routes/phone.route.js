const express = require("express")
const { addNewPhone, getAllPhones, getPhoneInfo } = require("../controllers/phone.controller")

const phoneRouter = express.Router()

phoneRouter.post("/add", addNewPhone)
phoneRouter.get("/get-all", getAllPhones)
phoneRouter.get("/:id", getPhoneInfo)

module.exports = phoneRouter