const joi = require("joi");

let authGate = (req, res, next) => {
  const schema = {
    username: joi
      .string()
      .alphanum()
      .max(8)
      .required()
  };

  const { error, value } = joi.validate(req.body, schema);

  if (error) {
    switch (error.details[0].context.key) {
      case "username":
        return res.status(400).json({
          err: true,
          msg: "Username should be alphanumeric and be less than 8 chars"
        });
      default:
        return res.status(400).json({
          err: true,
          msg: "Invalid payload"
        });
    }
  } else {
    req.xop = {
      username: value.username
    };

    next();
  }
};

let verify = (req, res, next) => {
  const schema = {
    username: joi
      .string()
      .alphanum()
      .max(8)
      .required(),
    captcha: joi
      .string()
      .max(5)
      .required()
  };

  const { error, value } = joi.validate(req.body, schema);

  if (error) {
    console.log(error);
    switch (error.details[0].context.key) {
      case "username":
        return res.status(400).json({
          err: true,
          msg: "Username should be alphanumeric and be less than 8 chars"
        });
      case "captcha":
        return res.status(400).json({
          err: true,
          msg: "Captcha should be less than 5 chars"
        });
      default:
        return res.status(400).json({
          err: true,
          msg: "Invalid payload"
        });
    }
  } else {
    req.xop = {
      username: value.username,
      captcha: value.captcha
    };

    next();
  }
};

module.exports = {
  authGate,
  verify
};
