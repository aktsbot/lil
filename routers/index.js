const express = require("express");
const router = express.Router();
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const apiPre = `/api/${config.api_version}`;

// get all routes
const auth = require("./auth");

router.use(`${apiPre}/auth`, auth);

// export that router
module.exports = router;
