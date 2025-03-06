const express = require("express")
const { addNewPhone } = require("../controllers/phone.controller")

const phoneRouter = express.Router()

phoneRouter.post("/add", addNewPhone)

module.exports = phoneRouter