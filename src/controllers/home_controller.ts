import {
  controller,
  httpGet,
  response,
  request
  // httpDelete,
  // httpPost
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPE } from "../constants/types";
import { UserService } from "../services/user_service";

@controller("/")
export class WebController {

  @inject(TYPE.UserService)
  public userService: UserService = new UserService()

  @httpGet("/")
  public async get(@response() res: IResponse) {
    res.send("Welcome to API EndPoint");
  }

  @httpGet("users")
  public async getUsers(@request() req: IRequest, @response() res: IResponse) {
    await this.userService.getUsers(req).then((userResponse) => {
      res.send(userResponse);
    }).catch((err: any) => {
      res.send(err);
    })
  }
}
