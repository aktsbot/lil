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

// --- start of helmet security
// ref: https://helmetjs.github.io/faq/you-might-not-need-helmet/
app.disable("x-powered-by");
// helmet headers
const HELMET_HEADERS = {
  "Content-Security-Policy":
    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Origin-Agent-Cluster": "?1",
  "Referrer-Policy": "no-referrer",
  "Strict-Transport-Security": "max-age=15552000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-DNS-Prefetch-Control": "off",
  "X-Download-Options": "noopen",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Permitted-Cross-Domain-Policies": "none",
  "X-XSS-Protection": "0",
};

app.use((req, res, next) => {
  res.set(HELMET_HEADERS);
  next();
});
// --- end of helmet security

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
