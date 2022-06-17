import { HttpResponse } from "../../helpers/http-response";
import { Status } from "../../helpers/status-codes";
import { ListFeedUsecase } from "./list-feed-usecase";
import { ListFeedResponse } from "./list-feed-utils";

export class ListFeedController {

  constructor(private readonly listFeedUsecase: ListFeedUsecase) {}

  async handle(circleIds: string[], itemName?: string, categoryIds?: string): Promise<HttpResponse> {
    const items = await this.listFeedUsecase.execute(circleIds, itemName, categoryIds);

    const response = items.reduce((acc, item) => {
      acc.items.push({
        id: item.id,
        name: item.name,
        image: item.image,
        category: {
          id: item.category.id,
          name: item.category.name
        },
        createdBy: item.createdBy.login,
        expirationDate: item.expirationDate,
        createdAt: item.createdAt
      });

      const isNewCategory = !acc.filters.categories.map((category) => category.id)
        .includes(item.category.id);

      if (isNewCategory) {
        acc.filters.categories.push({
          id: item.category.id,
          name: item.category.name
        });
      }

      return acc;
    }, { items: [], filters: { categories: [] } } as ListFeedResponse);
    
    return new HttpResponse(Status.OK, response);
  }

}