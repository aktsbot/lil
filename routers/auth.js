const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
const validate = require("../validates/auth");

router.post(`/`, validate.authGate, controller.authGate);
router.post(`/verify`, validate.verify, controller.verify);

module.exports = router;
