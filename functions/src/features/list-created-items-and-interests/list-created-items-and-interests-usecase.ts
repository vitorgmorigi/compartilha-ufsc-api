import { Item, ItemStatus } from "../../models/item";
import { ItemInterest, ItemInterestStatus } from "../../models/item-interest";
import { ListCreatedItemsAndInterestsRepository } from "./list-created-items-and-interests-repository";

type ItemWithInterested = Item & {
    itemInterests: Omit<ItemInterest, "item">[]
}

export class ListCreatedItemsAndInterestsUsecase {

  constructor(public readonly listCreatedItemsAndInterestsRepository: ListCreatedItemsAndInterestsRepository) {}

  async execute(userId: string): 
  Promise<ItemWithInterested[]> {
    const items = (await this.listCreatedItemsAndInterestsRepository.listItems(userId))
      .filter(item => 
        new Date(item.expirationDate).getTime() > new Date().getTime() 
            && item.status !== ItemStatus.DONATED
      );

    const itemInterested = await this.listCreatedItemsAndInterestsRepository.listItemInterested(userId);

    const itemWithInterested: ItemWithInterested[] = items.map((item) => {
      const itemInterests: Omit<ItemInterest, "item">[] = itemInterested
        .filter((interest) => interest.item.id === item.id && interest.status === ItemInterestStatus.PENDING)
        .map((interest) => {
          return {
            id: interest.id,
            interested: interest.interested,
            status: interest.status
          };
        });
      
      return {
        ...item,
        itemInterests
      };
    });

    return itemWithInterested;
  }

}