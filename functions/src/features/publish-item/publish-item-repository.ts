import { DatabaseService } from "../../database/database";
import { Item, toDatabase } from "../../models/item";
import { UserProfile } from "../../services/login/contracts";

export class PublishItemRepository {
  constructor(private readonly database: DatabaseService) {}

  async create(item: Item, userProfile: UserProfile): Promise<void> {
    return this.database.create("item", toDatabase(item, userProfile));
  }
}