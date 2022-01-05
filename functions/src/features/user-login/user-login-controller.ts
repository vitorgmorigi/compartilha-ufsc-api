import { CustomError, handleError } from "../../helpers/error";
import { HttpResponse } from "../../helpers/http-response";
import { Status } from "../../helpers/status-codes";
import { UserLoginUsecase } from "./user-login-usecase";
import { errorCodes } from "./user-login-utils";

export class UserLoginController {

  constructor(private readonly userLoginUsecase: UserLoginUsecase) {}

  private errorTranslator = {
    [errorCodes.TokenInvalidOrExpired]: {
      statusCode: Status.Unauthorized,
    },
  };

  async handle(token: string): Promise<HttpResponse> {
    try {
      const user = await this.userLoginUsecase.execute(token);

      return new HttpResponse(Status.OK, user);
    } catch (error) {
      return handleError(error as CustomError, this.errorTranslator);
    }
  }

}