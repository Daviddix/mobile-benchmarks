const { scaleImage } = require("./phone.utils");
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const phoneModel = require("../models/phone.model");
const connectToDb = require("../database/mongodb");

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_JUR_DEFAULT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

async function changeFirst(){
    try {
        await connectToDb();
        console.log("Finding first phone")
        const allPhones = await phoneModel.find({})
        if (!allPhones || allPhones.length === 0) {
            throw new Error("phone not found")
        }

        for (const phone of allPhones) {
            const nameOfPhone = phone.phoneName.replaceAll(" ", "-")
            if(phone.phoneCoverImage.toLowerCase().includes("e9b1a17119394ba39461e0a51e743eb0")){
                continue
            }
            console.log("I have a phone")


        const imageAsBuffer = await scaleImage(phone.phoneCoverImage);

        if (!imageAsBuffer) {
            throw new Error("Failed to scale image");
        } 

        const newPhoneCoverUrl = await uploadImageBuffer(imageAsBuffer, nameOfPhone)

        phone.phoneCoverImage = newPhoneCoverUrl

        await phone.save()

        console.log("process done, check bucket and check mongodb object")
        }    

    } catch (error) {
        console.error('Error with image:', error);
        console.log(error.message)
        return null;
    }
}


async function uploadImageBuffer(imageBuffer, phoneName) {
  const uploadParams = {
    Bucket: "phone-images",
    Key: `${phoneName}/v1/cover`,  // e.g., 'iphone15/front.jpg'
    Body: imageBuffer,
    ContentType: "image/png",
  };

  await s3.send(new PutObjectCommand(uploadParams));

  console.log("done uploading")

  return `${process.env.CLOUDFLARE_PUBLIC_URL}/${phoneName}/v1/cover`;
}

changeFirst()