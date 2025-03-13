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

async function getAllPhones(req, res){
    try{
        const allPhones = await phoneModel.find({}).limit(10) 

        res.status(200).json(allPhones)
    }
    catch(err){
        console.log("An error occurred", err) 
        res.status(500).json({type : "error", message : "Couldn't get phones, please try again"})
    } 
}

async function getPhoneInfo(req, res){
    try{
        const {id} = req.params
        const phoneInfo = await phoneModel.findById(id) 

        res.status(200).json(phoneInfo)
    }
    catch(err){
        console.log("An error occurred", err) 
        res.status(500).json({type : "error", message : "Couldn't get phones info, please try again"})
    } 
}

module.exports = {addNewPhone, getAllPhones, getPhoneInfo}