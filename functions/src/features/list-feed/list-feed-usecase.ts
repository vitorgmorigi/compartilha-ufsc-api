import { unnacent } from "../../helpers/unnacent";
import { Item, ItemStatus } from "../../models/item";
import { ListFeedRepository } from "./list-feed-repository";

export class ListFeedUsecase {

  constructor(public readonly listFeedRepository: ListFeedRepository) {}

  async execute(circleIds?: string[], privateCircleIds?: string[], itemName?: string, categoryIds?: string): 
  Promise<Item[]> {
    let items = await this.listFeedRepository.list(circleIds, privateCircleIds);

    items = items.filter(item => 
      new Date(item.expirationDate).getTime() > new Date().getTime() 
      && item.status !== ItemStatus.DONATED
    );

    if (itemName) {
      items = items.filter((item) => unnacent(item.name.toLowerCase().trim())
        .includes(unnacent(itemName.toLowerCase().trim())));
    }

    if (categoryIds) {
      const categoriesArray = categoryIds.split(",").map(category => category.trim());

      items = items.filter((item) => categoriesArray.includes(item.category.id));
    }

    return items;
  }

}