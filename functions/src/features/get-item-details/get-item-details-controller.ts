import { CustomError, handleError } from "../../helpers/error";
import { HttpResponse } from "../../helpers/http-response";
import { Status } from "../../helpers/status-codes";
import { GetItemDetailsUsecase } from "./get-item-details-usecase";
import { errorCodes } from "./get-item-details-utils";

export class ListFeedController {

  constructor(private readonly getItemDetailsUsecase: GetItemDetailsUsecase) {}

  private errorTranslator = {
    [errorCodes.ItemNotFound]: {
      statusCode: Status.NotFound,
    },
  };

  async handle(id: string): Promise<HttpResponse> {
    try {
      const item = await this.getItemDetailsUsecase.execute(id);

      return new HttpResponse(Status.OK, item);
    } catch (error) {
      return handleError(error as CustomError, this.errorTranslator);
    }
    
  }

}