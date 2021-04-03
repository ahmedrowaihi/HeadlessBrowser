const igbot = require("./Classes/instagram");
const secret = require("./Classes/secret");
(async () => {
  await igbot.init();

  await igbot.login(secret.username, secret.password);

  for (let i = 1; i > 0; i++) {
    await igbot.likeHashtagPosts("nodejs");
  }
  // await igbot.likeAccount("so7oby");

  debugger;
})();
