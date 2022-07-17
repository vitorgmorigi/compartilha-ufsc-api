import { CustomError, handleError } from "../../helpers/error";
import { HttpResponse } from "../../helpers/http-response";
import { Status } from "../../helpers/status-codes";
import { errorCodes } from "./delete-item-utils";
import { DeleteItemUsecase } from "./delete-item-usecase";

export class DeleteItemController {

  constructor(private readonly deleteItemUsecase: DeleteItemUsecase) {}

  private errorTranslator = {
    [errorCodes.AttemptToDeleteNonOwnItem]: {
      statusCode: Status.Forbidden,
    },
    [errorCodes.ItemDoesNotExists]: {
      statusCode: Status.NotFound,
    },
  };

  async handle(
    itemId: string, 
    userId: string): Promise<HttpResponse> {
    try {
      await this.deleteItemUsecase.execute(itemId, userId);

      const response = {  
        success: true,
        message: "Item deletado com sucesso",
      };

      return new HttpResponse(Status.OK, response);
    } catch (error) {
      return handleError(error as CustomError, this.errorTranslator);
    }
  }

}