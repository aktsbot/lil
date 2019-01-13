const joi = require("joi");

let getUserUrls = (req, res, next) => {
  const schema = {
    page: joi.number(),
    search: joi
      .string()
      .alphanum()
      .allow("")
      .max(100)
  };

  let queryParameters = {
    page: req.query.page ? req.query.page : 1,
    search: req.query.search ? req.query.search : ""
  };

  const { error, value } = joi.validate(queryParameters, schema);

  if (error) {
    switch (error.details[0].context.key) {
      case "page":
        return res.status(400).json({
          err: true,
          msg: "Page number should be a number"
        });
      case "search":
        return res.status(400).json({
          err: true,
          msg: "Search text should be alphanumeric"
        });
      default:
        return res.status(400).json({
          err: true,
          msg: "Invalid payload"
        });
    }
  } else {
    req.xop = {
      page: value.page,
      search: value.search
    };

    next();
  }
};

let addUrl = (req, res, next) => {
  const schema = {
    destination: joi
      .string()
      .max(512)
      .required()
  };

  const { error, value } = joi.validate(req.body, schema);

  if (error) {
    switch (error.details[0].context.key) {
      case "destination":
        return res.status(400).json({
          err: true,
          msg: "Url not present"
        });
      default:
        return res.status(400).json({
          err: true,
          msg: "Invalid payload"
        });
    }
  } else {
    req.xop = {
      destination: value.destination
    };
    next();
  }
};

module.exports = {
  getUserUrls,
  addUrl
};
