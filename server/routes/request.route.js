const express = require("express");
const { useAuth } = require("../middlewares/user.middlewares");
const { makeRequestForItem, getAllRequests, deleteRequest, markRequestAsAdded } = require("../controllers/request.controller");
const { onlyAdminAllowed } = require("../middlewares/admin.middlewares");
const { rateLimitEndpoint } = require("../middlewares/rate-limit-middlewares");

const requestRouter = express.Router();

// /api/request/

requestRouter.post("/make-request", useAuth, rateLimitEndpoint, makeRequestForItem);
requestRouter.get("/get-all", onlyAdminAllowed, getAllRequests);
requestRouter.delete("/delete/:requestId", onlyAdminAllowed, deleteRequest);
requestRouter.put("/add/:requestId", onlyAdminAllowed, markRequestAsAdded);

module.exports = requestRouter;