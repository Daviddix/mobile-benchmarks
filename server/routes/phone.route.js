const express = require("express")
const { addNewPhone, getAllPhones } = require("../controllers/phone.controller")

const phoneRouter = express.Router()

phoneRouter.post("/add", addNewPhone)
phoneRouter.get("/get-all", getAllPhones)

module.exports = phoneRouter