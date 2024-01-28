import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { logConfig } from "./loggerConfig";

const levels = {
  error: 0,
  info: 1,
};
const baseFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss A" }),
  winston.format.align(),
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
  )
);

const alignedWithColorsAndTime = winston.format.combine(
  baseFormat,
  winston.format.colorize({ all: true })
);

const alignedWithTime = winston.format.combine(baseFormat);

const options = {
  errorFile: {
    level: "error",
    handleExceptions: true,
    format: alignedWithTime,
    filename: logConfig.logFolder + "error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "4d",
  },
  file: {
    level: "info",
    handleExceptions: true,
    format: alignedWithTime,
    filename: logConfig.logFolder + "combined-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "4d",
  },
  consoleLog: {
    format: alignedWithColorsAndTime,
    silent: process.env.NODE_ENV?.toLowerCase() === "test",
  },
};

const logger = winston.createLogger({
  levels,
  transports: [
    new winston.transports.Console(options.consoleLog),
    new DailyRotateFile(options.errorFile),
    new DailyRotateFile(options.file),
  ],
  exitOnError: false,
});

const logStream = {
  write: (text: string) => {
    logger.info(text.replace(/(\r\n|\n|\r)/gm, ""));
  },
};

export { logger, logStream };
