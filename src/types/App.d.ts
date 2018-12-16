/**
 * @author Vivek Jain at Dec 1th 2018.
 */

import * as express from "express";

declare global {
  interface IRequest extends express.Request {
    cookies: { [k: string]: any };
  }

  interface IResponse extends express.Response {}

  type INext = (err?: Error) => void;
}
