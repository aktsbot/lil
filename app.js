const express = require("express");
const morgan = require("morgan");
const bp = require("body-parser");
const app = express();
const routes = require("./routers");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(morgan("short"));
app.use(routes);

module.exports = app;
