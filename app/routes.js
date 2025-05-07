import { Router } from "express";

import db from "./db.js";
import config from "./config.js";

import { pageHtml } from "./pages.js";

const router = Router();

// all pages
router.get("/", (req, res) => {
  return res.send(pageHtml.home());
});

router.get("/new", (req, res) => {
  return res.send(pageHtml.newUrl());
});

router.get("/me", (req, res) => {
  return res.send(pageHtml.me());
});

router.get("/list", (req, res) => {
  return res.send(pageHtml.listUrls());
});

router.get("/logout", (req, res) => {
  return res.redirect("/");
});

// all submissions

export default router;
