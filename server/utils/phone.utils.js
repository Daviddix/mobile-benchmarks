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
        console.log("I have gotten", phoneImageUrl)
        const originalResponse = await fetch(phoneImageUrl);
        if (!originalResponse.ok) throw new Error('Failed to fetch original image.');
        console.log("I have fetched", phoneImageUrl)

        // 2. Send to remove.bg
        const formData = new URLSearchParams();
        formData.append('image_url', phoneImageUrl);
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

        // 4. Calculate scale to fit within target size, preserving aspect ratio
        const targetWidth = 274;
        const targetHeight = 325;

        const widthRatio = targetWidth / metadata.width;
        const heightRatio = targetHeight / metadata.height;
        const scaleFactor = Math.min(widthRatio, heightRatio);

        const scaledWidth = Math.round(metadata.width * scaleFactor);
        const scaledHeight = Math.round(metadata.height * scaleFactor);

        console.log('Scaled size:', scaledWidth, scaledHeight);

        // 5. Resize the phone image to fit within the target box, preserving aspect ratio
        const resizedPhone = await sharp(noBgBuffer)
            .resize({
                width: scaledWidth,
                height: scaledHeight,
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .toBuffer();

        // 6. Create a white canvas that's 2x the target size
        const canvasFactor = 2;
        const canvasWidth = targetWidth * canvasFactor;
        const canvasHeight = targetHeight * canvasFactor;

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