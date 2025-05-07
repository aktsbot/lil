import sqlite from "better-sqlite3";
import path from "path";

const db = new sqlite(path.resolve("lil.db"), { fileMustExist: true });

const query = (sql, params) => {
  return db.prepare(sql).all(params);
};

const get = (sql, params) => {
  return db.prepare(sql).get(params);
};

const run = (sql, params) => {
  return db.prepare(sql).run(params);
};

export default {
  query,
  get,
  run,
};
