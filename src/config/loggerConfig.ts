export const logConfig = {
  logMode: process.env.NODE_ENV === "DEVELOPMENT" ? "tiny" : "combined",
  logFolder: process.env.LOG_FOLDER ?? "./logs/",
};
