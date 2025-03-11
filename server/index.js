//libraries
const express = require("express");
const connectToDb = require("./database/mongodb");
const app = express();
const puppeteer = require("puppeteer-core"); //UNINSTALL
const PORT = process.env.PORT || 3000;
const phoneRouter = require("./routes/phone.route")
const compatibleGameRouter = require("./routes/compatible-game.route")

app.use(express.json());

//routers
app.use("/api/phone", phoneRouter)
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

// {
//     "phone": "67c9f33b306754d510305b05",
//     "compatibleGamesInfo": [
//       {
//         "gameCoverImage": "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d4/ad/10/d4ad1084-839a-5ba2-c00d-c9de87388036/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/230x0w.webp",
//         "gameName": "Dream League Soccer",
//         "gameCompatibilityRating": 90,
//         "gameDescription": "Dream League Soccer 2025 puts you in the heart of the soccer action with a fresh look and brand new features! Collect your dream team from over 4,000 FIFPRO™ licensed soccer players and take to the field against the world’s best soccer clubs! Rise through 8 divisions whilst enjoying full 3D motion-captured player moves, immersive in-game commentary, team customisations and much more. The beautiful game has never been so good!",
//         "gameData": {
//           "fps": 60,
//           "frameRate": "High",
//           "playStoreDownloadLink": "https://play.google.com/store/apps/details?id=com.firsttouchgames.dls7&hl=en",
//           "iosDownloadLink": "https://apps.apple.com/us/app/dream-league-soccer-2025/id1462911602",
//           "graphicsQuality": "Medium",
//           "batteryUsagePerHour": null
//         }
//       },
//       {
//         "gameCoverImage": "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/18/76/30/1876302b-fb1a-75ae-701f-c4accca2165e/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/230x0w.webp",
//         "gameName": "PUBG Mobile",
//         "gameCompatibilityRating": 80,
//         "gameDescription": "PUBG MOBILE offers the most intense multiplayer battles on your mobile phone. Join the battle, gear up, and play to win. Survive in epic 100-player battles in Classic Mode, Payload , fast-paced 4v4 Arena battles, and Infection Mode. Survival is all that matters. Be the last one standing. ",
//         "gameData": {
//           "fps": 30,
//           "frameRate": "Power Saving",
//           "playStoreDownloadLink": "https://play.google.com/store/apps/details?id=com.tencent.ig&hl=en",
//           "iosDownloadLink": "https://apps.apple.com/us/app/pubg-mobile/id1330123889",
//           "graphicsQuality": "Smooth",
//           "batteryUsagePerHour": 6
//         }
//       },
//       {
//         "gameCoverImage": "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/26/9e/6a/269e6a24-f599-359e-72bd-39f7a8041110/AppIcon-1x_U007emarketing-0-9-0-85-220-0.png/230x0w.webp",
//         "gameName": "Call of Duty Mobile",
//         "gameCompatibilityRating": 60,
//         "gameDescription": "Play fast, fun first-person shooter (FPS) matches in popular Multiplayer modes such as Team Deathmatch, Domination, and Kill-Confirmed on iconic maps such as Shipment, Raid, and Standoff. Squad up and fight in fierce Battle Royale matches with modes like Tank Isolated and Training Ground set on iconic maps—all in CALL OF DUTY®: MOBILE!.",
//         "gameData": {
//           "fps": 30,
//           "frameRate": "High",
//           "playStoreDownloadLink": "https://play.google.com/store/apps/details?id=com.activision.callofduty.shooter&hl=en",
//           "iosDownloadLink": "https://apps.apple.com/us/app/call-of-duty-mobile/id1287282214",
//           "graphicsQuality": "Medium",
//           "batteryUsagePerHour": 20
//         }
//       }
//     ]
//   }
