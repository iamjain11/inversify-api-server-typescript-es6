/**
 * @author Vivek Jain at Dec 1st 2018.
 */

import * as http from "http";
import * as https from "https";
import { basename } from "path";
import "reflect-metadata";
import { bootstrapApplication } from "./app";
import { config } from "./config/config";
import { appLogger } from "./utilities/logger";

let LOGGER = appLogger.initLogger(basename(__filename));

(async () => {
  const port = config.PORT;
  // option for https server
  let server: https.Server | http.Server;

  server = http.createServer(await bootstrapApplication());

  server.listen(port);
  server.on("error", onError);
  server.on("listening", () => {
    const msg = `Server is now running on http://localhost:${port}`;
    LOGGER.info(msg);
  });

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== "listen") {
      throw error;
    }
    const bind = `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        LOGGER.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        LOGGER.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  process.on("unhandledRejection", e => {
    if (e.fatal) {
      LOGGER.error("unhandledRejection : ", e);
      process.exit(1);
    }
    // add logic to publish exceptions to development/production support.
    if (e.statusCode !== 304) {
      LOGGER.debug("!!UNHANDLED:");
      LOGGER.error(e);
    }
  });
})();
