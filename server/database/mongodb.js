const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const DB_URI = process.env.MONGO_URI 

if(!DB_URI){
    throw new Error("Please create a DB")
}

async function connectToDb(){
    try{
        await mongoose.connect(DB_URI)

        console.log("connected to DB")
    }
    catch(error){
        console.error("An error occurred while connecting to the DB", error) 

        process.exit(1)
    }
}

module.exports = connectToDb