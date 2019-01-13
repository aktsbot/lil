const db = require("../models");

// there'll be no JSON responses
let getDestination = async (req, res) => {
  try {
    let urlData = await db.Url.find({
      where: {
        short: req.xop.short,
        status: "ACTIVE"
      }
    });

    if (!urlData) {
      return res.status(404).send("NOT FOUND");
    }

    return res.redirect(301, urlData.destination);
  } catch (e) {
    console.log(`[server] get destination error: ${e}`);
    return res.status(500).send("SERVER B0RK3D");
  }
};

module.exports = {
  getDestination
};
