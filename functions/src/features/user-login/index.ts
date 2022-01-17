import { UserLoginController } from "./user-login-controller";
import { UserLoginRepository } from "./user-login-repository";
import { UserLoginUsecase } from "./user-login-usecase";
import { databaseInstance as database } from "../../database";
import { loginServiceInstance } from "../../services/login";

const userLoginRepository = new UserLoginRepository(database);
const userLoginUsecase = new UserLoginUsecase(userLoginRepository, loginServiceInstance);
export const userLoginController = new UserLoginController(userLoginUsecase);