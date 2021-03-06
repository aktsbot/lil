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

router.post(`/`, utils.verifyToken, validate.addUrl, controller.addUrl);

router.delete(
  `/:id`,
  utils.verifyToken,
  validate.deleteUrl,
  controller.deleteUrl
);

module.exports = router;
