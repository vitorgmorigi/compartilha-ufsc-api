import { HttpResponse } from "../../helpers/http-response";
import { Status } from "../../helpers/status-codes";
import { UserProfile } from "../../services/login/contracts";
import { CreateItemInterestUsecase } from "./create-item-interest-usecase";
import { CreateItemInterestRequest } from "./create-item-interest-utils";

export class CreateItemInterestController {

  constructor(private readonly createItemInterestUsecase: CreateItemInterestUsecase) {}

  async handle(requestData: CreateItemInterestRequest, user: UserProfile): Promise<HttpResponse> {
    await this.createItemInterestUsecase.execute(requestData, user);

    const response = {  
      success: true,
      message: "Registro de interesse publicado com sucesso",
    };

    return new HttpResponse(Status.Created, response);
  }
}