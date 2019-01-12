const utils = require("../utils");
const randomstring = require("randomstring");
const svgCaptcha = require("svg-captcha");
const db = require("../models");

let authGate = async (req, res) => {
  try {
    // check if the "username" parameter in payload is in db
    const existingUserData = await db.User.find({
      where: {
        username: req.body.username
      }
    });

    const captcha = svgCaptcha.create();
    const captchaText = captcha.text;
    if (!existingUserData) {
      // if the user doesnt exist, add username id to Users
      const newUser = {
        username: req.body.username,
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
    const resp = utils.respJSON({
      err: true,
      msg: "",
      data: "Server error!"
    });
    return res.status(500).json(resp);
  }
};

module.exports = {
  authGate
};
