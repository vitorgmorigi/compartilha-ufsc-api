import { DatabaseService } from "../../database/database";
import { ItemInterest, toDatabase } from "../../models/item-interest";

export class CreateItemInterestRepository {
  constructor(private readonly database: DatabaseService) {}

  async create(itemInterest: ItemInterest): Promise<void> {
    return this.database.create("item_interest", toDatabase(itemInterest));
  }
}