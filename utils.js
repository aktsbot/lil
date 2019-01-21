const jwt = require("jsonwebtoken");

const respJSON = data => {
  return {
    err: data.err,
    msg: data.msg,
    data: data.data
  };
};

const respDefaultErrorJSON = () => {
  return {
    err: true,
    msg: "Server error!",
    data: {}
  };
};

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).json({ error: true, msg: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET || "00secret00", (err, decoded) => {
    if (err)
      return res.status(500).json({
        error: true,
        msg: "Failed to authenticate token. Please login again!"
      });

    // if everything good, save to request for use in other routes
    req.token = {
      userId: decoded.id
    };
    next();
  });
};

module.exports = {
  respJSON,
  respDefaultErrorJSON,
  verifyToken
};
