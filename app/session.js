import session from "express-session";
import sqliteSession from "connect-sqlite3";

import config from "./config.js";

const sqliteStore = sqliteSession(session);

export const sessionStore = new sqliteStore({
  db: "lil.db",
  table: "sessions",
});

// https://expressjs.com/en/resources/middleware/session.html
export const appSession = () =>
  session({
    secret: config.sessionSecret,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    name: config.sessionCookieName,
  });
