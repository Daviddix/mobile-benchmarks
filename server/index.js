//libraries
const express = require("express");
const connectToDb = require("./database/mongodb");
const app = express();
const cors = require("cors")
const PORT = process.env.PORT || 3000;
const phoneRouter = require("./routes/phone.route")
const compatibleGameRouter = require("./routes/compatible-game.route");
const gameRouter = require("./routes/game.route");
const userRouter = require("./routes/user.route");
const submittedGameRouter = require("./routes/submitted-game.route")
const cookieParser = require("cookie-parser"); 
const adminRouter = require("./routes/admin.route");


const allowedOrigins = ["http://localhost:5173", "https://mobile-benchmarks.vercel.app", ]; // Add more for prod if needed

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // crucial for cookies and headers to work across origins
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser())
 
//routers 
app.use("/api/phone", phoneRouter)
app.use("/api/game", gameRouter)
app.use("/api/compatible-game", compatibleGameRouter)
app.use("/api/submit-game", submittedGameRouter)
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)

app.listen(PORT, async () => {
    try{
        await connectToDb();
        console.log(`I am alive and running at ${PORT}`);
    }
    catch(error){
        console.log("An error occurred", error)
    }
});