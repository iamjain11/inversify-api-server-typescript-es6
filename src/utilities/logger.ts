import * as fs from "fs";
import * as path from "path";
import { config } from "../config";

const logLevel = config.LOG_LEVEL || 'debug';
const appRoot = path.join(__dirname, "../../");
const logDir = path.join(appRoot, "logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

import { configure, getLogger, Logger } from "log4js";

configure({
  appenders: {
    file_appender: {
      type: "file",
      filename: `${appRoot}/logs/app.log`,
      maxLogSize: 10458760
    },
    out: { type: "stdout" }
  },
  categories: {
    default: { appenders: ["file_appender", "out"], level: logLevel }
  }
});

class AppLogger {
  public initLogger(name: string): Logger {
    return getLogger(name);
  }
}

export const appLogger: AppLogger = new AppLogger();
