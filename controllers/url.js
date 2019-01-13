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

    // pagination
    let p = 1;
    let skip = 0;
    let perPage = 30;

    if (req.xop.page && req.xop.page > 1) {
      p = req.xop.page;
      skip = perPage * p + 1;
    }

    const query = {
      attributes: ["id", "destination", "short", "status", "createdAt"],
      where: {
        UserId: req.token.userId
      },
      offset: skip,
      limit: perPage,
      raw: true // this returns a JSON, instead of an entity
    };

    if (req.xop.search && req.xop.search != "") {
      query.where["destination"] = { $like: `%${req.xop.search}%` };
    }

    let userUrls = await db.Url.findAll(query);

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

const addUrl = async (req, res) => {
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

    const newUrl = {
      destination: req.xop.destination,
      status: "ACTIVE",
      short: randomstring.generate(7),
      UserId: req.token.userId
    };

    const urlSaveStatus = await db.Url.create(newUrl);
    urlSaveStatus.short = `${config.hostname}/${urlSaveStatus.short}`;
    const resp = utils.respJSON({
      err: false,
      msg: "Url addedd successfully",
      data: urlSaveStatus
    });

    return res.status(201).json(resp);
  } catch (e) {
    console.log(`[server] add url error: ${e}`);
    const resp = utils.respDefaultErrorJSON();
    return res.status(500).json(resp);
  }
};

const deleteUrl = async (req, res) => {
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

    let urlData = await db.Url.find({
      where: {
        id: req.xop.id,
        UserId: req.token.userId
      }
    });

    if (!urlData) {
      const resp = utils.respJSON({
        err: true,
        msg: "Url does not belong to you.",
        data: {}
      });

      return res.status(403).json(resp);
    }

    urlData.status = "DELETED";
    await urlData.save();

    const resp = utils.respJSON({
      err: false,
      msg: "Url deleted successfully",
      data: {}
    });

    return res.status(200).json(resp);
  } catch (e) {
    console.log(`[server] add url error: ${e}`);
    const resp = utils.respDefaultErrorJSON();
    return res.status(500).json(resp);
  }
};

module.exports = {
  getUserUrls,
  addUrl,
  deleteUrl
};
