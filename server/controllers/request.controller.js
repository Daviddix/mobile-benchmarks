const { noBodyDataError, unknownError } = require("../JsonResponses/error");
const requestModel = require("../models/requests.model");

async function makeRequestForItem(req, res) {
    try {
        const {requestItem, requestType} = req.body;

        const userInfo = req.user.userId

        if (!requestItem || !requestType) {
            return res.status(400).json(noBodyDataError);
        }

        const requestObject = {
            requestType,
            requestItem,
            userInfo
        };

        const newRequest = await requestModel.create(requestObject);

        res.status(201).json(newRequest);
    } catch (err) {
        console.log("An error occurred", err.message);
        res.status(500).json(unknownError);
    }
}

async function getAllRequests(req, res){
    try{
        const allRequests = await requestModel.find({}).limit(10)

        res.status(200).json(allRequests)
    }catch(err){
        console.log(err.message)
        res.status(500).json(unknownError)
    }
}

async function markRequestAsAdded(req, res){
    try{
        const {requestId} = req.params;

        if(!requestId){
            return res.status(400).json(missingData);
        }

        const request = await requestModel.findById(requestId);

        if(!request){
            return res.status(404).json(itemNotFound);
        }

        await requestModel.findByIdAndDelete(requestId);

        res.status(200).json({message : "Report resolved successfully"});
    }catch(err){
        console.log(err.message);
        res.status(500).json(unknownError)
    }
}

async function deleteRequest(req, res){
    try{
        const {requestId} = req.params;

        if(!requestId){
            return res.status(400).json(missingData);
        }

        const request = await requestModel.findById(requestId);

        if(!request){
            return res.status(404).json(itemNotFound);
        }

        await requestModel.findByIdAndDelete(requestId);

        res.status(200).json({message : "Report resolved successfully"});
    }catch(err){
        console.log(err.message);
        res.status(500).json(unknownError)
    }
}

module.exports = {
    makeRequestForItem,
    getAllRequests,
    markRequestAsAdded,
    deleteRequest
}