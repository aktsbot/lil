const express = require("express");
const router = express.Router();
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const apiPre = `/api/${config.api_version}`;

// get all routes
const auth = require("./auth");
const url = require("./url");
const reroute = require("./reroute");

router.use("/", express.static("pub"));
router.use("/app", express.static(__dirname + "/../pub/app.html"));
router.use("/", reroute);
router.use(`${apiPre}/auth`, auth);
router.use(`${apiPre}/url`, url);

// export that router
module.exports = router;
