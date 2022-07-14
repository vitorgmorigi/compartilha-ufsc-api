import { HttpResponse } from "../../helpers/http-response";
import { Status } from "../../helpers/status-codes";
import { ListCreatedItemsAndInterestsUsecase } from "./list-created-items-and-interests-usecase";

export class ListCreatedItemsAndInterestsController {

  constructor(private readonly listCreatedItemsAndInterestsUsecase: ListCreatedItemsAndInterestsUsecase) {}

  async handle(userId: string): 
  Promise<HttpResponse> {
    const itemsWithInterests = await this.listCreatedItemsAndInterestsUsecase.execute(userId);

    return new HttpResponse(Status.OK, { items: itemsWithInterests });
  }

}