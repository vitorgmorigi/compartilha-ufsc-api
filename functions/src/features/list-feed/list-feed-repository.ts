import { None, Option } from "monapt";
import { DatabaseService } from "../../database/database";
import { fromDatabase, Item, ItemDatabase } from "../../models/item";

export class ListFeedRepository {
  constructor(private readonly database: DatabaseService) {}

  async list(circleIds?: string[], privateCircleIds?: string[]): Promise<Item[]> {
    const result: Item[] = [];

    if (circleIds) {
      const items = await this.database.findIn<ItemDatabase>("item", "circle.id", circleIds);
      
      items.get().forEach(doc => {
        result.push(fromDatabase(doc));
      });

      return result;
    }

    const publicItems = await this.database.find<ItemDatabase>("item", "circle.visibility", "public");

    let privateItems: Option<ItemDatabase[]> = None;

    if (privateCircleIds && privateCircleIds.length > 0) {
      privateItems = await this.database.findIn<ItemDatabase>("item", "circle.id", privateCircleIds);

      if (privateItems.isDefined) {
        privateItems.get().forEach(doc => {
          result.push(fromDatabase(doc));
        });
      }
    }
    
    if (publicItems.isDefined) {
      publicItems.get().forEach(doc => {
        result.push(fromDatabase(doc));
      });
    }

    return result;
  }

}