const utils = require("../utils");
const randomstring = require("randomstring");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = require("../models");

const isUserActive = async userId => {
  try {
    const userData = await db.User.find({
      where: {
        id: userId
      }
    });

    if (!userData) {
      return false;
    }

    if (userData.status !== "ACTIVE") {
      return false;
    }

    return true;
  } catch (e) {
    console.log(`[error] userId active check crashed -> ${e}`);
    return false;
  }
};

const getUserUrls = async (req, res) => {
  try {
    // check if user is ACTIVE
    if (!isUserActive(req.token.userId)) {
      const resp = utils.respJSON({
        err: true,
        msg: "User is not active",
        data: []
      });

      return res.status(401).json(resp);
    }

    let userUrls = await db.Url.findAll({
      attributes: ["id", "destination", "short", "status", "createdAt"],
      where: {
        UserId: req.token.userId
      },
      raw: true // this returns a JSON, instead of an entity
    });

    if (userUrls && userUrls.length > 0) {
      userUrls = userUrls.map(urlData => {
        let newUrlData = {
          id: urlData.id,
          destination: urlData.destination,
          short: `${config.hostname}/${urlData.short}`,
          status: urlData.status,
          createdAt: urlData.createdAt
        };

        return newUrlData;
      });
    }

    const resp = utils.respJSON({
      err: false,
      msg: "Urls found",
      data: userUrls
    });

    return res.status(200).json(resp);
  } catch (e) {
    console.log(`[server] get user urls error: ${e}`);
    const resp = utils.respDefaultErrorJSON();
    return res.status(500).json(resp);
  }
};

module.exports = {
  getUserUrls
};
