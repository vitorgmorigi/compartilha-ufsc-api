import { None, Option } from "monapt";
import { DatabaseService } from "../../database/database";
import { ItemStatus } from "../../models/item";
import { ItemInterest, ItemInterestDatabase, ItemInterestStatus, fromDatabase } from "../../models/item-interest";

export class ReplyItemInterestRepository {
  constructor(private readonly database: DatabaseService) {}

  async updateItemInterest(itemInterestId: string, answer: Omit<ItemInterestStatus, "pending">): Promise<void> {
    return this.database.update("item_interest", itemInterestId, { status: answer });
  }

  async updateItemToDonatedStatus(itemId: string): Promise<void> {
    return this.database.update("item", itemId, { status: ItemStatus.DONATED } );
  }

  async getItemInterested(itemInterestId: string): Promise<Option<ItemInterest>> {
    const userItemInterests = await this.database
      .findOne<ItemInterestDatabase>("item_interest", "id", itemInterestId);

    if (userItemInterests.isDefined) {
      return Option(fromDatabase(userItemInterests.get()));
    }
  
    return None;
  }
}