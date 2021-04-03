const puppeteer = require("puppeteer");
const fs = require("fs");
const BASE_URL = "https://google.com/";
const google = {
  browser: null,
  page: null,

  init: async () => {
    google.browser = await puppeteer.launch({
      // headless: false,
    });
    google.page = await google.browser.newPage();
  },
  search: async (search) => {
    await google.page.setDefaultNavigationTimeout(0);
    await google.page.goto(BASE_URL, { waitUtil: "networkidle2" });
    // stuck in here

    await google.page.type('input[name="q"]', search, {
      delay: 500,
    });
    await google.page.keyboard.down("Enter");
    await google.page.waitForNavigation({ waitUtil: "networkidle2" });
    await google.page.screenshot({ path: "googleResults.png" });
  },
};

module.exports = google;
