const express = require("express");
const router = express.Router();
const controller = require("../controllers/url");
const validate = require("../validates/url");
const utils = require("../utils");

router.get(
  `/`,
  utils.verifyToken,
  validate.getUserUrls,
  controller.getUserUrls
);

module.exports = router;