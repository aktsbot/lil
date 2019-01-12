const express = require("express");
const morgan = require("morgan");
const app = express();
const routes = require("./router");

app.use(morgan("short"));
app.use(routes);

module.exports = app;
