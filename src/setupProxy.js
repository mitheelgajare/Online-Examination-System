const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(proxy("/writeFile", { target: "http://localhost:5000/" }));
};
