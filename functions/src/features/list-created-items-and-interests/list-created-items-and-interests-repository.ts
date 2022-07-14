import { DatabaseService } from "../../database/database";
import { fromDatabase as itemFromDatabase, Item, ItemDatabase } from "../../models/item";
import { fromDatabase as itemInterestFromDatabase, 
  ItemInterest, ItemInterestDatabase } from "../../models/item-interest";

export class ListCreatedItemsAndInterestsRepository {
  constructor(private readonly database: DatabaseService) {}

  async listItems(userId: string): Promise<Item[]> {
    const result: Item[] = [];

    const userCreatedItems = await this.database.find<ItemDatabase>("item", "created_by.id", userId);

    userCreatedItems.get().forEach(doc => {
      result.push(itemFromDatabase(doc));
    });
      
    return result;
  }

  async listItemInterested(userId: string): Promise<ItemInterest[]> {
    const result: ItemInterest[] = [];

    const userItemInterests = await this.database
      .find<ItemInterestDatabase>("item_interest", "item.created_by.id", userId);

    userItemInterests.get().forEach(doc => {
      result.push(itemInterestFromDatabase(doc));
    });
      
    return result;
  }
}