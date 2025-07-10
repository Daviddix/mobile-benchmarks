// npm install sharp dotenv
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const REMOVE_BG_KEY = process.env.REMOVE_BG_API_KEY;

/**
 * @param {string} imageUrl – URL of the phone image
 * @param {number} width – desired output width
 * @param {number} height – desired output height
 */
async function processPhoneImage(imageUrl, width, height) {
  // 1) download original
  const resp = await fetch(imageUrl);
  const originalBuffer = await resp.arrayBuffer();

  // 2) send to remove.bg
  const form = new FormData();
  form.append('image_file_b64', Buffer.from(originalBuffer).toString('base64'));
  form.append('size', 'auto');

  const rmResp = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-API-Key': REMOVE_BG_KEY
    },
    body: form
  });

  if (!rmResp.ok) {
    throw new Error(`remove.bg failed: ${rmResp.statusText}`);
  }

  const noBgBuffer = Buffer.from(await rmResp.arrayBuffer());

  // 3) resize and composite on white
  return await sharp(noBgBuffer)
    .resize(width, height, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .flatten({ background: '#ffffff' })
    .png()
    .toBuffer();
}

(async () => {
  const inputUrl = 'https://m-cdn.phonearena.com/images/phones/81314-350/Samsung-Galaxy-S21.webp?w=1';
  const resultBuffer = await processPhoneImage(inputUrl, 500, 500);
  fs.writeFileSync(path.resolve(__dirname, 'phone-white.png'), resultBuffer);
  console.log('Done: phone-s.png');
})();
