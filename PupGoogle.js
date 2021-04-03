const google = require("./Classes/google");

(async () => {
  await google.init();

  await google.search("so7oby");

  debugger;
})();
