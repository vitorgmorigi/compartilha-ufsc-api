import { None, Option } from "monapt";
import { DatabaseService } from "../../database/database";
import { fromDatabase, Item, ItemDatabase } from "../../models/item";

export class GetItemDetailsRepository {
  constructor(private readonly database: DatabaseService) {}

  async get(id: string): Promise<Option<Item>> {
    const item = await this.database.findOne<ItemDatabase>("item", "id", id);
    
    if (item.isDefined) {
      return Option(fromDatabase(item.get()));
    }

    return None;
  }

}