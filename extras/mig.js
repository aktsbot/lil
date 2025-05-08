import sqlite from "better-sqlite3";
import path from "path";

import dbDest from "../app/db.js";
import { makeId, makeToken } from "../app/utils.js";

// node extras/mig.js lil.old.db
const dbSrcPath = process.argv[2] || "lil.old.db";
const _dbSrc = new sqlite(path.resolve(dbSrcPath), { fileMustExist: true });
const dbSrc = {
  query: (sql, params) => {
    return _dbSrc.prepare(sql).all(params);
  },
};

function start() {
  try {
    const allUsers = dbSrc.query(
      `SELECT id, username, status, createdAt FROM users`,
      {}
    );
    for (const user of allUsers) {
      const urls = dbSrc.query(
        `SELECT id, destination, short, status, createdAt FROM Urls WHERE status=@status AND UserId=@UserId`,
        {
          UserId: user.id,
          status: "ACTIVE",
        }
      );
      // insert the user
      let newUser = {
        id: makeId(),
        username: user.username,
        api_token: makeToken(),
        status: "active",
      };
      dbDest.run(
        `INSERT INTO users (id, username, api_token, status) 
      VALUES (@id, @username, @api_token, @status)`,
        { ...newUser }
      );
      // insert the url
      for (const url of urls) {
        let newUrl = {
          id: makeId(),
          destination: url.destination,
          short: url.short || makeId(),
          user: newUser.id,
        };
        dbDest.run(
          `INSERT INTO urls (id, destination, short, user) VALUES (@id, @destination, @short, @user);`,
          { ...newUrl }
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
}

start();
