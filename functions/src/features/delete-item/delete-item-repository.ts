import { None, Option } from "monapt";
import { DatabaseService } from "../../database/database";
import { fromDatabase, Item, ItemDatabase } from "../../models/item";
import { ItemInterest, ItemInterestDatabase,
  fromDatabase as itemInterestFromDatabase } from "../../models/item-interest";

export class DeleteItemRepository {
  constructor(private readonly database: DatabaseService) {}

  async delete(itemId: string): Promise<void> {
    return this.database.delete("item", itemId);
  }

  async get(id: string): Promise<Option<Item>> {
    const item = await this.database.findOne<ItemDatabase>("item", "id", id);
    
    if (item.isDefined) {
      return Option(fromDatabase(item.get()));
    }

    return None;
  }

  async getItemInterests(itemId: string): Promise<ItemInterest[]> {
    const result: ItemInterest[] = [];

    const itemInterests = await this.database
      .find<ItemInterestDatabase>("item_interest", "item.id", itemId);

    itemInterests.get().forEach(doc => {
      result.push(itemInterestFromDatabase(doc));
    });
      
    return result;
  }

  async deleteItemInterests(itemInterests: ItemInterest[]): Promise<void[]> {
    const deletePromises = itemInterests.map((itemInterest) => this.database.delete("item_interest", itemInterest.id));

    return Promise.all(deletePromises);
  }

}