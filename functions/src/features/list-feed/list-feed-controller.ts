import { HttpResponse } from "../../helpers/http-response";
import { Status } from "../../helpers/status-codes";
import { ListFeedUsecase } from "./list-feed-usecase";

export class ListFeedController {

  constructor(private readonly listFeedUsecase: ListFeedUsecase) {}

  async handle(circleIds: string[]): Promise<HttpResponse> {
    const response = await this.listFeedUsecase.execute(circleIds);
    
    return new HttpResponse(Status.OK, response);
  }

}