const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const gameModel = require("../models/game.model");
const connectToDb = require("../database/mongodb");
const fetch = require("node-fetch");

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_JUR_DEFAULT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

async function uploadGameScreenshotToR2() {
  try {
    await connectToDb();
    console.log("Finding all games");
    const allGames = await gameModel.find({});
    if (!allGames || allGames.length === 0) {
      throw new Error("no games found");
    }

    for (const game of allGames) {
      const nameOfGame = game.gameName.replaceAll(" ", "-");

      console.log("I have a game");

      // Process all screenshots in parallel
      const screenshotPromises = game.moreInfo.gameScreenshots.map(async (screenshot, index) => {
        if(screenshot.includes("7d825de7fe1949939042aa51fad59ea6")){
          return screenshot; // Return the original URL instead of continue
        }
        const screenshotAsBuffer = await imageUrlToBuffer(screenshot);

        const newScreenShotUrl = await uploadImageBuffer(
          screenshotAsBuffer,
          nameOfGame,
          index
        );

        console.log(`updated ${index + 1} screenshot for ${nameOfGame}`);
        return newScreenShotUrl;
      });

      game.moreInfo.gameScreenshots = await Promise.all(screenshotPromises);

      await game.save();

    }
  } catch (error) {
    console.error("Error with image:", error);
    console.log(error.message);
    return null;
  }
}

async function uploadImageBuffer(imageBuffer, gameName, index) {
  const uploadParams = {
    Bucket: "game-images",
    Key: `${gameName}/v1/screenshot-${index}`, // e.g., 'iphone15/front.jpg'
    Body: imageBuffer,
    ContentType: "image/png",
  };

  await s3.send(new PutObjectCommand(uploadParams));

  console.log("done uploading");

  return `${process.env.CLOUDFLARE_PUBLIC_URL_GAMES}/${gameName}/v1/screenshot-${index}`;
}

async function imageUrlToBuffer(imageUrl) {
  try {
    console.log(imageUrl)
    console.log(`Fetching image from URL: ${imageUrl}`);
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }
    
    // Convert the response to a buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log(`Successfully converted image to buffer (${buffer.length} bytes)`);
    return buffer;
  } catch (error) {
    console.error(`Error fetching image: ${error.message}`);
    throw error;
  }
}

uploadGameScreenshotToR2();
