const utils = require("./utils");

let sayHiBack = async (req, res) => {
  try {
    const resp = utils.respJSON({ err: false, msg: "", data: "Hi" });
    return res.status(200).json(resp);
  } catch (e) {
    console.log(`[server] say hi error: ${e}`);
    const resp = utils.respJSON({
      err: true,
      msg: "",
      data: "Server error!"
    });
    return res.status(500).json(resp);
  }
};

module.exports = {
  sayHiBack
};
