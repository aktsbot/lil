const express = require("express");
const router = express.Router();
const controller = require("../controllers/reroute");
const validate = require("../validates/reroute");

router.get(`/:short`, validate.getDestination, controller.getDestination);

module.exports = router;
