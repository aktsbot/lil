export const userSessionRequired = (req, res, next) => {
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
