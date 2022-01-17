import { CustomError, handleError } from "../../helpers/error";
import { HttpResponse } from "../../helpers/http-response";
import { Status } from "../../helpers/status-codes";
import { JoinInACircleUsecase } from "./join-in-a-circle-usecase";
import { errorCodes } from "./join-in-a-circle-utils";

export class JoinInACircleController {

  constructor(private readonly joinInACircleUsecase: JoinInACircleUsecase) {}

  private errorTranslator = {
    [errorCodes.CircleNotFound]: {
      statusCode: Status.NotFound,
    },
    [errorCodes.CirclePasswordUndefined]: {
      statusCode: Status.BadRequest,
    },
    [errorCodes.CirclePasswordIncorrect]: {
      statusCode: Status.Forbidden  
    },
    [errorCodes.JoinCircleError]: {
      statusCode: Status.InternalServerError  
    },
  };

  async handle(userId: string, circleId: string, circlePassword?: string): Promise<HttpResponse> {
    try {
      const response = await this.joinInACircleUsecase.execute(userId, circleId, circlePassword);

      return new HttpResponse(Status.OK, response);
    } catch (error) {
      return handleError(error as CustomError, this.errorTranslator);
    }
  }

}