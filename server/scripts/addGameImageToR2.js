const { scaleImage } = require("../utils/phone.utils");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const gameModel = require("../models/game.model");
const connectToDb = require("../database/mongodb");
const fetch = require("node-fetch")

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_JUR_DEFAULT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

async function uploadGameCoverImageToR2() {
  try {
    await connectToDb();
    console.log("Finding all games");
    const allGames = await gameModel.find({});
    if (!allGames || allGames.length === 0) {
      throw new Error("game not found");
    }

    for (const game of allGames) {
      const nameOfGame = game.gameName.replaceAll(" ", "-");
      if (
        game.gameCoverImage
          .toLowerCase()
          .includes("e9b1a17119394ba39461e0a51e743eb0")
      ) {
        continue;
      }
      console.log("I have a game");

      //change game image from URL to buffer

      const imageAsBuffer = await imageUrlToBuffer(game.gameCoverImage)


      const newGameCoverUrl = await uploadImageBuffer(
        imageAsBuffer,
        nameOfGame
      );

      game.gameCoverImage = newGameCoverUrl;

      await game.save();

      console.log("process done, check bucket and check mongodb object");
    }
  } catch (error) {
    console.error("Error with image:", error);
    console.log(error.message);
    return null;
  }
}

async function uploadImageBuffer(imageBuffer, gameName) {
  const uploadParams = {
    Bucket: "game-images",
    Key: `${gameName}/v1/cover`, // e.g., 'iphone15/front.jpg'
    Body: imageBuffer,
    ContentType: "image/png",
  };

  await s3.send(new PutObjectCommand(uploadParams));

  console.log("done uploading");

  return `${process.env.CLOUDFLARE_PUBLIC_URL}/${gameName}/v1/cover`;
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

async function replaceAllOccurrences(){
  try{
    await connectToDb()
    const allGames = await gameModel.find({})

    for (const game of allGames){
      const newGameUrl = game.gameCoverImage.replace("https://pub-e9b1a17119394ba39461e0a51e743eb0.r2.dev", "https://pub-7d825de7fe1949939042aa51fad59ea6.r2.dev")

      console.log("finished replacing" + game.gameName)

      game.gameCoverImage = newGameUrl
      await game.save()
    }

    console.log("done")
  }catch(err){
    console.log("An error occurred", err.message)
    return 
  }
}

replaceAllOccurrences();
