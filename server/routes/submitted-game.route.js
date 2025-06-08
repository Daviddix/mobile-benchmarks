const express = require("express");
const { useAuth } = require("../middlewares/user.middlewares");
const { submitGameForReview } = require("../controllers/submitted-game.controller");

const submittedGameRouter = express.Router()

submittedGameRouter.post("/submit", useAuth, submitGameForReview);

module.exports = submittedGameRouter