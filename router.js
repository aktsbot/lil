const express = require("express");
const router = express.Router();
const controller = require("./controller");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/./config/config.json")[env];

router.get(`/api/${config.api_version}/hi`, controller.sayHiBack);

module.exports = router;
