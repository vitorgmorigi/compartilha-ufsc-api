import { CustomError, handleError } from "../../helpers/error";
import { HttpResponse } from "../../helpers/http-response";
import { Status } from "../../helpers/status-codes";
import { ItemInterestStatus } from "../../models/item-interest";
import { ReplyItemInterestUsecase } from "./reply-item-interest-usecase";
import { errorCodes, ReplyItemInterestRequest } from "./reply-item-interest-utils";

export class ReplyItemInterestController {

  constructor(private readonly replyItemInterestUsecase: ReplyItemInterestUsecase) {}

  private errorTranslator = {
    [errorCodes.InvalidAnswer]: {
      statusCode: Status.BadRequest,
    },
  };

  async handle(itemInterestId: string, requestData: ReplyItemInterestRequest): Promise<HttpResponse> {
    try {
      await this.replyItemInterestUsecase.execute(itemInterestId, requestData);
    
      const responseMessage = requestData.answer === ItemInterestStatus.ACCEPTED ?
        "aceito" :
        "recusado";
    
      const response = {  
        success: true,
        message: `O registro de interesse foi ${responseMessage} com sucesso`,
      }; 
    
      return new HttpResponse(Status.Created, response);
    } catch (error) {
      return handleError(error as CustomError, this.errorTranslator);
    }
  }
}