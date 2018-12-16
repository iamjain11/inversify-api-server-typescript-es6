import { AsyncContainerModule } from "inversify";
import { TYPE } from "./constants";
import {
  UserService
} from "./services";

export const bindings = new AsyncContainerModule(async bind => {
  await require("./controllers/home_controller");

  bind<UserService>(TYPE.UserService).to(UserService);

});
