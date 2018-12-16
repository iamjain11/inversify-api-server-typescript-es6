/**
 * @author Vivek Jain at Dec 1st 2018.
 */

import * as bodyParser from "body-parser";
import { bindings } from "./inversify.config";
import * as compression from "compression";
import { Container } from "inversify";
import { config } from "./config";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import { InversifyExpressServer } from "inversify-express-utils";
import * as morgan from "morgan";

export const bootstrapApplication = async (): Promise<express.Application> => {
  const container = new Container();
  await container.loadAsync(bindings);
  const app = new InversifyExpressServer(container);

  app.setConfig(middleware => {
    middleware.set("port", config.PORT);

    middleware.use(
      morgan("dev"),
      helmet.frameguard({
        action: "deny"
      }),
      helmet.xssFilter({
        setOnOldIE: false
      }),
      helmet.hsts({
        includeSubdomains: true, // Must be enabled to be approved by Google
        maxAge: 10886400000, // Must be at least 18 weeks to be approved by Google
        preload: true
      }),
      helmet.hidePoweredBy(),
      cors(),
      compression(),
      bodyParser.urlencoded({
        extended: true
      }),
      bodyParser.json()
    );

    middleware.use((req: any, res, next) => {
      // add logic to url authentication
      next();
    });
  });

  return app.build();
};
