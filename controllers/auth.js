const utils = require("../utils");
const randomstring = require("randomstring");
const db = require("../models");

let authGate = async (req, res) => {
  try {
    // check if the "email" parameter in payload is in db
    const existingUserData = await db.User.find({
      where: {
        email: req.body.email
      }
    });

    const gateCode = randomstring.generate(5);
    if (!existingUserData) {
      // if the user doesnt exist, add email id to Users
      const newUser = {
        email: req.body.email,
        status: "ACTIVE",
        gateCode
      };

      const userSaveStatus = await db.User.create(newUser);
      console.log(userSaveStatus);
    }
    // if the user exists, generate a gateCode and send it via email

    return res.json({});
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
