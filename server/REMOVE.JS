const fetch = require('node-fetch');
const sharp = require('sharp');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config()

// Replace this with your actual remove.bg API key
const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;

/**
 * Process a phone image by removing the background, resizing it,
 * and placing it on a larger white canvas.
 */
async function processPhoneImage(imageUrl) {
  try {
    // 1. Download original image
    const originalResponse = await fetch(imageUrl);
    if (!originalResponse.ok) throw new Error('Failed to fetch original image.');
    const originalBuffer = await originalResponse.buffer();

    // 2. Send to remove.bg
    const formData = new URLSearchParams();
    formData.append('image_url', imageUrl);
    formData.append('size', 'auto');

    const removeBgResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': REMOVE_BG_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });

    if (!removeBgResponse.ok) {
      const errorText = await removeBgResponse.text();
      throw new Error('Remove.bg failed: ' + errorText);
    }

    const noBgBuffer = await removeBgResponse.buffer();

    // 3. Get original image dimensions
    const metadata = await sharp(noBgBuffer).metadata();
    console.log('Original image size:', metadata.width, metadata.height);

    if (!metadata.width || !metadata.height) {
      throw new Error('Invalid image metadata from remove.bg');
    }

    // 4. Resize the image down (adjust the scale factor to your needs)
    const scaleFactor = 0.3; // 50% size
    const scaledWidth = 274
    const scaledHeight = 325

    console.log('Scaled size:', scaledWidth, scaledHeight);

    // 5. Resize the phone image
    const resizedPhone = await sharp(noBgBuffer)
      .resize(scaledWidth, scaledHeight)
      .toBuffer();

    // 6. Create a white canvas that's 3x the size of the phone image
    const canvasFactor = 2;
    const canvasWidth = scaledWidth * canvasFactor;
    const canvasHeight = scaledHeight * canvasFactor;

    if (!canvasWidth || !canvasHeight || isNaN(canvasWidth) || isNaN(canvasHeight)) {
      throw new Error(`Invalid canvas size: ${canvasWidth}x${canvasHeight}`);
    }

    // 7. Composite the phone image centered on the white canvas
    const finalImage = await sharp({
      create: {
        width: canvasWidth,
        height: canvasHeight,
        channels: 3,
        background: { r: 255, g: 255, b: 255 }
      }
    })
      .composite([
        {
          input: resizedPhone,
          top: Math.floor((canvasHeight - scaledHeight) / 2),
          left: Math.floor((canvasWidth - scaledWidth) / 2)
        }
      ])
      .png()
      .toBuffer();

    // 8. Optional: Save result
    fs.writeFileSync('final-2-image.png', finalImage);
    console.log('Image saved as final-image.png');

    return finalImage;
  } catch (err) {
    console.error('Error processing phone image:', err);
    throw err;
  }
}

// Example usage
const phoneImageUrl = 'https://fdn2.gsmarena.com/vv/pics/tecno/tecno-spark-20-pro-1.jpg';
processPhoneImage(phoneImageUrl);
