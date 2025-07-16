const puppeteer = require('puppeteer-core');
const browserExecutablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fetch = require('node-fetch');
const sharp = require('sharp');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config()

const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;



async function scrapeUrlForPhoneInfo(phoneUrl) {
  try {
    const browser = await puppeteer.launch({
      executablePath: browserExecutablePath,
      headless: false,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1024 });

    await page.goto(phoneUrl, {
      waitUntil: 'domcontentloaded', // or 'networkidle2'
      timeout: 60000,
    });

    // Wait for the phone name to appear
    await page.waitForSelector('.specs-phone-name-title', { timeout: 15000 });

    // Now safely select and extract text
    const phoneName = await page.$eval('.specs-phone-name-title', el => el.textContent.trim()).catch(() => "Not found");
    const phoneCPU = await page.$eval("#specs-list > table:nth-child(6) > tbody > tr:nth-child(2) > td.nfo", el => el.textContent.trim()).catch(() => "Not found");
    const phoneDisplayPixels = await page.$eval("#specs-list > table:nth-child(5) > tbody > tr:nth-child(2) > td.nfo", el => el.textContent.trim()).catch(() => "Not found");
    const phoneDisplayRefreshRate = await page.$eval("#specs-list > table:nth-child(5) > tbody > tr:nth-child(1) > td.nfo", el => el.textContent.trim()).catch(() => "Not found");
    const phoneMemory = await page.$eval("#specs-list > table:nth-child(7) > tbody > tr:nth-child(2) > td.nfo", el => el.textContent.trim()).catch(() => "Not found");
    const phoneGPU = await page.$eval("#specs-list > table:nth-child(6) > tbody > tr:nth-child(4) > td.nfo", el => el.textContent.trim()).catch(() => "Not found");
    const phoneBenchmarks = await page.$eval(
      "#specs-list > table:nth-child(15) > tbody > tr:nth-child(1) > td.nfo",
      el => el.textContent.trim()
    ).catch(() => "Not found");

    // Output results
    const result = {
      phoneName,
      phoneCPU,
      phoneDisplay : [phoneDisplayPixels, phoneDisplayRefreshRate],
      phoneMemory,
      phoneGPU,
      phoneBenchmarks,
      phoneGeneralCompatibility : 0
    };

    await browser.close();
    return result;
  } catch (err) {
    console.log(err.message ?? err);
  }
}

async function scaleImage(phoneImageUrl) {
    try {
        // 1. Download original image
        console.log("Fetching", phoneImageUrl);
        const originalResponse = await fetch(phoneImageUrl);
        if (!originalResponse.ok) throw new Error('Failed to fetch original image.');

        // 2. Send to remove.bg
        const formData = new URLSearchParams();
        formData.append('image_url', phoneImageUrl);
        formData.append('size', 'auto'); // Request higher resolution

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

        // 4. Set larger target dimensions
        const targetWidth = 648; // Increased from 548
        const targetHeight = 750; // Increased from 650

        // 5. Resize the phone image to fit the target box
        const resizedPhone = await sharp(noBgBuffer)
            .resize({
                width: targetWidth,
                height: targetHeight,
                fit: 'cover',
                withoutEnlargement: false, // Allow upscaling
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .toBuffer();

        // 6. Create a canvas matching the target size
        const canvasWidth = targetWidth * 1.4;
        const canvasHeight = targetHeight * 1.4;

        const finalImage = await sharp({
            create: {
                width: Math.floor(canvasWidth),
                height: Math.floor(canvasHeight),
                channels: 3,
                background: { r: 26, g: 26, b: 26 }
            }
        })
            .composite([
                {
                    input: resizedPhone,
                    top: Math.floor((canvasHeight - targetHeight) / 2), 
                    left:Math.floor((canvasWidth - targetWidth) / 2)
                }
            ])
            .png({ quality: 100 }) // Ensure high-quality PNG
            .toBuffer();

        // 7. Save the output
        await fs.promises.writeFile('output.png', finalImage);
        console.log('Image saved as output.png');

        return finalImage;
    } catch (err) {
        console.error('Error processing phone image:', err);
        throw err;
    }
}

module.exports = {
    scrapeUrlForPhoneInfo,
    scaleImage
}