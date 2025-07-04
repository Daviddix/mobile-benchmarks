const express = require("express");
const { useAuth } = require("../middlewares/user.middlewares");
const { makeRequestForItem, getAllRequests, deleteRequest, markRequestAsAdded } = require("../controllers/request.controller");
const { onlyAdminAllowed } = require("../middlewares/admin.middlewares");

const requestRouter = express.Router();

// /api/request/

requestRouter.post("/make-request", useAuth, makeRequestForItem);
requestRouter.get("/get-all", onlyAdminAllowed, getAllRequests);
requestRouter.delete("/delete/:requestId", onlyAdminAllowed, deleteRequest);
requestRouter.post("/add/:requestId", onlyAdminAllowed, markRequestAsAdded);

module.exports = requestRouter;