// Emulating Device Metrics and User Agent
const puppeteer = require("puppeteer");

const iphone6 = puppeteer.devices["iPhone 6"];
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(iphone6);
  await page.goto("https://www.facebook.com/");
  await page.screenshot({ path: "facebook.png" });
  const host = await page.evaluate(() => location.host);
  console.log(host); // 'm.facebook.com'
  browser.close();
})();
