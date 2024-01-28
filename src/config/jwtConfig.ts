export const jwtConfig = {
  access: {
    secret: process.env.JWT_SECRET || "this_is_access_secret",
    expiration: process.env.JWT_EXPIRATION || "1d",
  },
  refresh: {
    secret: process.env.JWT_REFRESH_SECRET || "this_is_refresh_secret",
    expiration: process.env.JWT_REFRESH_EXPIRATION || "120s",
  },
};
