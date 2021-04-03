const pptr = require("puppeteer");

const instagram = {
  browser: null,
  page: null,

  init: async () => {
    instagram.browser = await pptr.launch({
      headless: false,
      defaultViewport: null,
    });
    instagram.page = await instagram.browser.newPage();

    await instagram.page.goto("https://instagram.com/", {
      waitUntil: "networkidle2",
    });
  },

  login: async (username, password) => {
    await instagram.page.waitForSelector('input[name="username"]');
    await instagram.page.type('input[name="username"]', username, {
      delay: 50,
    });
    await instagram.page.type('input[name="password"]', password, {
      delay: 50,
    });
    await instagram.page.keyboard.press("Enter");

    await instagram.page.waitForNavigation();
  },
  likeAccount: async (account) => {
    await instagram.page.goto(`https://www.instagram.com/${account}`);
    await instagram.page.waitForTimeout(1500);
    await instagram.page.waitForSelector("li:nth-child(1) > span > span");
    await instagram.page.waitForSelector("._9AhH0");
    const LenNode = await instagram.page.$("li:nth-child(1) > span > span")
      .innerText;
    debugger;
    const firstPost = await instagram.page.$("._9AhH0");
    const PostsLen = parseInt(LenNode) || 50;
    debugger;
    await firstPost.click();
    debugger;
    while (true) {
      // for (let i = 0; i < PostsLen; i++) {
      //proses like
      let isLikeAble = null;
      try {
        await instagram.page.waitForSelector('body[style="overflow: hidden;"]');
        await instagram.page.waitForTimeout(1000);
        isLikeAble = await instagram.page.waitForSelector(
          'body > div._2dDPU._4RgK.CkGkG > div > div > article > div._0s_9n > div.iW5O_ > div > section.ltpMr._96JFA.t6Mad > span.fr66n > button > div > span > svg[aria-label="UnLike"]',
          { timeout: 3000 }
        );
      } catch (err) {
        isLikeAble = null;
      }

      if (isLikeAble) {
        await instagram.page.waitForTimeout(1500);

        await instagram.page.click(
          "body > div._2dDPU._4RgK.CkGkG > div > div > article > div._0s_9n > div.iW5O_ > div > section.ltpMr._96JFA.t6Mad > span.fr66n > button"
        );
        await instagram.page.keyboard.press("ArrowRight");
      }

      //menutup modal
      await instagram.page.keyboard.press("ArrowRight");
      // }
    }
  },
  likeHashtagPosts: async (hastag) => {
    await instagram.page.goto(
      `https://www.instagram.com/explore/tags/${hastag}`
    );
    await instagram.page.waitForTimeout(1500);

    const posts = await instagram.page.$$(
      'article > div:nth-child(3) img[decoding="auto"]'
    );

    for (let i = 0; i < posts.length; i++) {
      let post = posts[i];
      await post.click();

      //proses like
      let isLikeAble = null;
      try {
        await instagram.page.waitForSelector('body[style="overflow: hidden;"]');
        await instagram.page.waitForTimeout(1000);
        isLikeAble = await instagram.page.waitForSelector(
          'svg[aria-label="Like"]',
          { timeout: 3000 }
        );
      } catch (err) {
        isLikeAble = null;
      }

      if (isLikeAble) {
        await instagram.page.waitForTimeout(1500);
        await instagram.page.click('svg[aria-label="Like"]');
        await instagram.page.waitForTimeout(1000);
      }

      //menutup modal
      await instagram.page.waitForTimeout(2000);
      await instagram.page.click('svg[aria-label="Close"]');
    }
  },
};

module.exports = instagram;
