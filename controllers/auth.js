const utils = require("../utils");
const randomstring = require("randomstring");
const svgCaptcha = require("svg-captcha");
const jwt = require("jsonwebtoken");
const db = require("../models");

let authGate = async (req, res) => {
  try {
    // check if the "username" parameter in payload is in db
    const existingUserData = await db.User.find({
      where: {
        username: req.xop.username
      }
    });

    const captcha = svgCaptcha.create();
    const captchaText = captcha.text;
    if (!existingUserData) {
      // if the user doesnt exist, add username id to Users
      const newUser = {
        username: req.xop.username,
        status: "ACTIVE",
        captcha: captchaText
      };

      await db.User.create(newUser);
    } else {
      existingUserData.captcha = captchaText;
      await existingUserData.save();
    }

    const resp = utils.respJSON({
      err: false,
      msg: "Captcha generated",
      data: captcha.data
    });

    return res.status(200).json(resp);
  } catch (e) {
    console.log(`[server] authGate error: ${e}`);
    const resp = utils.respDefaultErrorJSON();
    return res.status(500).json(resp);
  }
};

let verify = async (req, res) => {
  try {
    const userData = await db.User.find({
      where: {
        username: req.xop.username
      }
    });

    if (!userData) {
      const resp = utils.respJSON({
        err: true,
        msg: "Username not found",
        data: {}
      });

      return res.status(400).json(resp);
    }

    if (userData.status != "ACTIVE") {
      const resp = utils.respJSON({
        err: true,
        msg: "Username not active",
        data: {}
      });

      return res.status(401).json(resp);
    }

    if (userData.captcha != req.xop.captcha) {
      const resp = utils.respJSON({
        err: true,
        msg: `Captcha is invalid`,
        data: {}
      });
      return res.status(401).json(resp);
    }

    let token = jwt.sign(
      {
        id: userData.id
      },
      process.env.JWT_SECRET || "00secret00",
      {
        expiresIn: 604800 // expires in 7 days
      }
    );

    userData.captcha = "";
    await userData.save();

    const resp = utils.respJSON({
      err: false,
      msg: `Login successful`,
      data: token
    });
    return res.status(200).json(resp);
  } catch (e) {
    console.log(`[server] verify error: ${e}`);
    const resp = utils.respDefaultErrorJSON();
    return res.status(500).json(resp);
  }
};

module.exports = {
  authGate,
  verify
};
