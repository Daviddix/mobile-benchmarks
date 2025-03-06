//libraries
const express = require("express");
const connectToDb = require("./database/mongodb");
const app = express();
const puppeteer = require("puppeteer-core");
const PORT = process.env.PORT || 3000;
const phoneRouter = require("./routes/phone.route")

app.use(express.json());

//routers
app.use("/api/phone", phoneRouter)

app.listen(PORT, async () => {
    try{
        await connectToDb();
        console.log(`I am alive and running at ${PORT}`);
    }
    catch(error){
        console.log("An error occurred", error)
    }
});
