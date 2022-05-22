import { DatabaseService } from "../../database/database";
import { fromDatabase, Item, ItemDatabase } from "../../models/item";

export class ListFeedRepository {
  constructor(private readonly database: DatabaseService) {}

  async list(circleIds: string[]): Promise<Item[]> {
    const items = await this.database.findIn<ItemDatabase>("item", "circle.id", circleIds);
    const result: Item[] = [];

    if (items.isEmpty) {
      return result;
    }

    items.get().forEach(doc => {
      result.push(fromDatabase(doc));
    });

    return result;
  }

}