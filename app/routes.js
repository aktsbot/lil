import svgCaptcha from "svg-captcha";
import { Router } from "express";

import db from "./db.js";
import config from "./config.js";
import { ifLoggedInGoHome, userSessionRequired } from "./middlewares.js";

import { pageHtml } from "./pages.js";
import { makeId, makeToken } from "./utils.js";

const router = Router();

// all pages
router.get("/", ifLoggedInGoHome, (req, res) => {
  return res.send(
    pageHtml.home({
      query: req.query,
    })
  );
});

router.get("/new", userSessionRequired, (req, res) => {
  return res.send(
    pageHtml.newUrl({
      query: req.query,
      user: res.locals.user,
    })
  );
});

router.get("/me", userSessionRequired, (req, res) => {
  return res.send(
    pageHtml.me({
      query: req.query,
      user: res.locals.user,
    })
  );
});

router.get("/list", userSessionRequired, (req, res) => {
  let limit = 20;
  let offset = 0;

  const page = req.query.p || 1; // 1
  offset = page * limit - limit;

  const count = db.get(`SELECT count(id) as count FROM urls WHERE user=@user`, {
    user: res.locals.user.id,
  });

  const results = db.query(
    `SELECT 
    id, destination, short
    FROM 
    urls WHERE user=@user
    ORDER BY created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}`,
    {
      user: res.locals.user.id,
    }
  );
  const totalPages = Math.ceil(count.count / limit);
  let nextPageLink = "";
  let prevPageLink = "";
  if (page < totalPages) {
    nextPageLink = `/list?p=${Number(page) + 1}`;
  }
  if (page > 1) {
    prevPageLink = `/list?p=${Number(page) - 1}`;
  }

  return res.send(
    pageHtml.listUrls({
      query: req.query,
      user: res.locals.user,
      results,
      totalPages,
      offset,
      nextPageLink,
      prevPageLink,
      page,
    })
  );
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    return res.redirect("/");
  });
});

router.get("/captcha.svg", (req, res) => {
  const captcha = svgCaptcha.create();
  req.session.captchaText = captcha.text;
  res.set("Content-Type", "image/svg+xml");
  return res.send(captcha.data);
});

// all submissions
router.post("/login", (req, res, next) => {
  const { body } = req;
  const backUrl = req.header("Referer") || "/";

  if (!body.username || !body.captcha) {
    return res.redirect(backUrl + "?message=Invalid+payload");
  }

  if (!req.session.captchaText || req.session.captchaText !== body.captcha) {
    return res.redirect(backUrl + "?message=Invalid+captcha");
  }

  let user = {
    id: makeId(),
    username: body.username,
    api_token: makeToken(),
    status: "active",
  };
  const userResults = db.query(
    `SELECT id, username, api_token, created_at, status FROM users where username=@username LIMIT 1`,
    {
      username: body.username,
    }
  );

  if (userResults.length == 0) {
    // create user
    db.run(
      `INSERT INTO users (id, username, api_token, status) VALUES (@id, @username, @api_token, @status);`,
      { ...user }
    );
  }

  if (userResults[0]) {
    user = {
      ...userResults[0],
    };
  }

  if (user.status !== "active") {
    return res.redirect(backUrl + "?message=User+cannot+login");
  }

  req.session.user = user;
  return res.redirect("/list");
});

// where all urls goto shorten :)
router.post("/", userSessionRequired, (req, res, next) => {
  const { body } = req;
  const backUrl = req.header("Referer") || "/new";

  if (!body || !body.full_url) {
    if (res.locals.not_browser) {
      return res.status(400).send("Invalid payload");
    }
    return res.redirect(backUrl + "?message=Invalid+payload");
  }

  if (body.short) {
    const shortResults = db.query(`SELECT id FROM urls WHERE short=@short`, {
      short: body.short,
    });

    if (shortResults.length) {
      if (res.locals.not_browser) {
        return res.status(400).send("Short code already in use");
      }
      return res.redirect(backUrl + "?message=Short+code+already+in+use");
    }
  }

  const url = {
    id: makeId(),
    destination: body.full_url,
    short: body.short || makeId(),
    user: res.locals.user.id,
  };

  // create url
  db.run(
    `INSERT INTO urls (id, destination, short, user) VALUES (@id, @destination, @short, @user);`,
    { ...url }
  );

  if (res.locals.not_browser) {
    return res.send(`${config.hostname}/${url.short}`);
  }

  return res.redirect("/list");
});

// last route to get full url for a short
router.get("/:short", (req, res, next) => {
  const { short } = req.params;

  const data = db.get(`SELECT destination FROM urls WHERE short=@short`, {
    short,
  });

  if (data) {
    return res.status(301).redirect(data.destination);
  }

  next();
});

export default router;
