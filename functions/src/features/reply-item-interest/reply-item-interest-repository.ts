import { DatabaseService } from "../../database/database";
import { ItemInterestStatus } from "../../models/item-interest";

export class ReplyItemInterestRepository {
  constructor(private readonly database: DatabaseService) {}

  async update(itemInterestId: string, answer: Omit<ItemInterestStatus, "pending">): Promise<void> {
    return this.database.update("item_interest", itemInterestId, { status: answer });
  }
}