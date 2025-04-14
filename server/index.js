//libraries
const express = require("express");
const connectToDb = require("./database/mongodb");
const app = express();
const cors = require("cors")
const PORT = process.env.PORT || 3000;
const phoneRouter = require("./routes/phone.route")
const compatibleGameRouter = require("./routes/compatible-game.route");
const gameRouter = require("./routes/game.route");

app.use(cors())
app.use(express.json());
 
//routers 
app.use("/api/phone", phoneRouter)
app.use("/api/game", gameRouter)
app.use("/api/compatible-game", compatibleGameRouter)

app.listen(PORT, async () => {
    try{
        await connectToDb();
        console.log(`I am alive and running at ${PORT}`);
    }
    catch(error){
        console.log("An error occurred", error)
    }
});