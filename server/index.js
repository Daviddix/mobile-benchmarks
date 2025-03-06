//libraries
const express = require("express");
const connectToDb = require("./database/mongodb");
const app = express();
const puppeteer = require("puppeteer-core");
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/h", async (req, res) => {
  console.log("running scraper");
  const browser = await puppeteer.launch({
    executablePath:
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    timeout: 0 
  });
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto("https://www.gsmarena.com/samsung_galaxy_a15-12637.php", {timeout : 0});

  const phoneName = await page.locator(".specs-phone-name-title");

  console.log(phoneName);
  console.log("finished scraping");

  await browser.close();
  res.send(phoneName);
});

// app.listen(PORT, async () => {
//     try{
//         await connectToDb();
//         console.log(`I am alive and running at ${PORT}`);
//     }
//     catch(error){
//         console.log("An error occurred", error)
//     }
// });
