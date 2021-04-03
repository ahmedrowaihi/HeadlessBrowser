// Scraping Content From Websites
const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.npmjs.com/search?q=react");
  const packages = await page.evaluate(() => {
    var nodes = document.querySelectorAll(
      "div.w-60-l > div.flex.flex-row.items-end.pr3 > a > h3"
    );
    return [...nodes].map((el) => el.textContent);
  });
  console.log(packages);
  browser.close();
})();
