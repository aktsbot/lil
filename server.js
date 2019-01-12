const app = require("./app");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/./config/config.json")[env];

const port = process.env.PORT || config.port;

const server = app.listen(port, () => {
  console.log(`[server] app running on port ${port}`);
});
