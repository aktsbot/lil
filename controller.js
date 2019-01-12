const utils = require("./utils");

/**
 * This endpoint simply should return a "Hi"
 * @param {*} req
 * @param {*} res
 */
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

let authGate = async (req, res) => {
  try {
    // check if the "email" parameter in payload is in db
    // const existingUserData = await
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
  sayHiBack
};
