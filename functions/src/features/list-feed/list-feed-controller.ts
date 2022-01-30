import { HttpResponse } from "../../helpers/http-response";
import { Status } from "../../helpers/status-codes";
import { Circle } from "../../models/circle";
import { ListFeedUsecase } from "./list-feed-usecase";

export class ListFeedController {

  constructor(private readonly listFeedUsecase: ListFeedUsecase) {}

  async handle(circles: Circle[]): Promise<HttpResponse> {
    const response = await this.listFeedUsecase.execute(circles);
    
    return new HttpResponse(Status.OK, response);
  }

}