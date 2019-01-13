const joi = require("joi");

let getDestination = (req, res, next) => {
  const schema = {
    short: joi
      .string()
      .max(7)
      .required()
  };

  const { error, value } = joi.validate(req.params, schema);

  if (error) {
    switch (error.details[0].context.key) {
      case "short":
        return res.status(400).send("AHA! A BAD URL ID");
      default:
        return res.status(400).send("BAD REQUEST");
    }
  } else {
    req.xop = {
      short: value.short
    };
    next();
  }
};

module.exports = {
  getDestination
};
