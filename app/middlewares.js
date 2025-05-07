import db from "./db.js";

export const userSessionRequired = (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (token) {
    const user = db.get(
      `SELECT id, username, api_token, created_at, status FROM users where api_token=@api_token`,
      {
        api_token: token,
      }
    );
    if (user) {
      res.locals.user = user;
      res.locals.not_browser = true;
    }
  }

  // TODO: check headers for tokens as well.
  if (!res.locals.user) {
    return next({ statusCode: 403, message: "Access denied. Please login" });
  }
  next();
};

export const ifLoggedInGoHome = (req, res, next) => {
  if (res.locals.user) {
    return res.redirect("/list");
  }
  next();
};
