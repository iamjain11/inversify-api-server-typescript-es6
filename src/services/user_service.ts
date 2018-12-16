import { basename } from "path";
// import { injectable, inject } from "inversify";
import { injectable } from "inversify";
import { Request } from "express";
// import { TYPE } from "../constants";
import { appLogger } from "../utilities/logger";
// import { HomeService } from "../services/home_service";

let LOGGER = appLogger.initLogger(basename(__filename));

let USERS: any = [
  {
    firstName: 'anil',
    lastName: 'kumar',
    email: 'anilkumar@gmail.com',
    username: 'anilkumar'
  }
]

@injectable()
export class UserService {

  // @inject(TYPE.HomeService)
  // public homeService: HomeService = new HomeService();

  public getUsers(req: Request): Promise<void> {
    return new Promise((resolve, reject) => {
      LOGGER.info('getUsers method executed successfully')
      resolve(USERS)
    });
  }


}
