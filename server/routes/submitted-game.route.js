const express = require("express");
const { useAuth } = require("../middlewares/user.middlewares");
const { submitGameForReview } = require("../controllers/submitted-game.controller");
const { rateLimitEndpoint } = require("../middlewares/rate-limit-middlewares");

const submittedGameRouter = express.Router()

submittedGameRouter.post("/submit",rateLimitEndpoint, useAuth, submitGameForReview);

module.exports = submittedGameRouter