const phoneModel = require("../models/phone.model")

async function addNewPhone(req, res){
    try{
        const phoneInfo = req.body

        if(Object.keys(phoneInfo).length == 0){
            res.status(400).json({type : "error", message : "No phone info found"})
        }

        const newPhoneAdded = await phoneModel.create(phoneInfo)

        res.status(201).json(newPhoneAdded)
    }
    catch(err){
        console.log("An error occurred", err) 
        res.status(500).json({type : "error", message : "Server Error"})
    } 
}

module.exports = {addNewPhone}