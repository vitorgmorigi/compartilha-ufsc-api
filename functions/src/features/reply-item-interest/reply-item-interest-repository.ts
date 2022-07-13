import { DatabaseService } from "../../database/database";
import { ItemStatus } from "../../models/item";
import { ItemInterestStatus } from "../../models/item-interest";

export class ReplyItemInterestRepository {
  constructor(private readonly database: DatabaseService) {}

  async updateItemInterest(itemInterestId: string, answer: Omit<ItemInterestStatus, "pending">): Promise<void> {
    return this.database.update("item_interest", itemInterestId, { status: answer });
  }

  async updateItemToDonatedStatus(itemId: string): Promise<void> {
    return this.database.update("item", itemId, { status: ItemStatus.DONATED } );
  }
}