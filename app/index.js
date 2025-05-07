import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

import config from "./config.js";
import router from "./routes.js";

import { appSession } from "./session.js";

const app = express();

app.use(appSession());
app.use(cookieParser());

// thanks to wesbos
// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.currentPath = req.path;
  next();
});

app.disable("x-powered-by");

// http logger
app.use((req, res, next) => {
  res.on("finish", function () {
    console.log(req.method, decodeURI(req.url), res.statusCode);
  });
  next();
});
app.use(express.urlencoded({ extended: true }));

// all application routes
app.use("/", router);

// 404 and other error handlers
app.use((req, res, next) => {
  next({ statusCode: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Unknown error happened";

  return res.status(statusCode).send(message);
});

app.listen(config.port, () => {
  console.log(`[${config.appName}] server listening on port ${config.port}`);
});
