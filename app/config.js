const env = process.env;

const config = {
  port: env.LIL_PORT || 3030,
  appName: env.LIL_APP_NAME || "lil",
  env: env.NODE_ENV || "production",
  sessionSecret: env.LIL_SESSION_SECRET || "Change this!",
  sessionCookieName: env.LIL_SESSION_COOKIE_NAME || "lil.sid",
};

export default config;
