const env = process.env;

const config = {
  port: env.LIL_PORT || 3030,
  appName: env.LIL_APP_NAME || "lil",
  env: env.NODE_ENV || "production",
};

export default config;
