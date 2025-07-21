const phoneModel = require("../models/phone.model")
const { unknownError, invalidDataSubmitted } = require("../JsonResponses/error");
const { scrapeUrlForPhoneInfo, scaleImage } = require("../utils/phone.utils");

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
        const allPhones = await phoneModel.find({}).limit(20) 

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

async function searchForPhone(req, res) {
  try {
    let { searchQuery } = req.query;

    // Check if it's missing or blank
    if (!searchQuery || typeof searchQuery !== 'string' || searchQuery.trim() === '') {
      return res.status(400).json(missingData);
    }

    // Validate length
    if (searchQuery.length > 50) {
      return res.status(400).json(invalidDataSubmitted);
    }

    // Escape regex characters
    searchQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const phones = await phoneModel.find({
      phoneName: { $regex: searchQuery, $options: 'i' }
    });

    return res.json(phones);
  } catch (err) {
    console.error(err);
    return res.status(500).json(unknownError);
  }
}

async function transformImage(req, res){
  try {
    const { imageUrl } = req.body;

    if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
      return res.status(400).json(invalidDataSubmitted);
    }

    console.log("started transforming images")
    const transformedImage = await scaleImage(imageUrl); 

    if (!transformedImage) {
      return res.status(404).json({ type: "error", message: "transformed image error" });
    }

    // res.status(200).json({imageUrl : transformedImage});
    res.set('Content-Type', 'image/png');
    res.send(transformedImage)
  } catch (error) {
    console.log(error)
    res.status(500).json(unknownError)
  }
}

async function scrapePhoneInfo(req,res){
  try{
    const { phoneUrl } = req.body;

    if (!phoneUrl || typeof phoneUrl !== 'string' || phoneUrl.trim() === '') {
      return res.status(400).json(invalidDataSubmitted);
    }

    const phoneInfo = await scrapeUrlForPhoneInfo(phoneUrl);

    if (!phoneInfo) {
      return res.status(404).json({ type: "error", message: "Phone information not found" });
    }

    res.status(200).json(phoneInfo);
  }
  catch(err){
    console.log("An error occurred while scraping phone info", err.message ?? err) 
    res.status(500).json(unknownError)
  }
}

module.exports = {addNewPhone, getAllPhones, getPhoneInfo, searchForPhone, transformImage, scrapePhoneInfo}