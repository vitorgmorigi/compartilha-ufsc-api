import { CustomError, handleError } from "../../helpers/error";
import { HttpResponse } from "../../helpers/http-response";
import { Status } from "../../helpers/status-codes";
import { errorCodes } from "./publish-item-utils";
import { PublishItemRequest } from "./publish-item-request";
import { PublishItemUsecase } from "./publish-item-usecase";
import { UserProfile } from "../../services/login/contracts";

export class PublishItemController {

  constructor(private readonly publishItemUsecase: PublishItemUsecase) {}

  private errorTranslator = {
    [errorCodes.ExpirationDateLessThanNow]: {
      statusCode: Status.BadRequest,
    },
  };

  async handle(requestData: PublishItemRequest, userProfile: UserProfile): Promise<HttpResponse> {
    try {
      await this.publishItemUsecase.execute(requestData, userProfile);

      const response = {  
        success: true,
        message: "Item publicado com sucesso",
      };

      return new HttpResponse(Status.Created, response);
    } catch (error) {
      return handleError(error as CustomError, this.errorTranslator);
    }
  }

}