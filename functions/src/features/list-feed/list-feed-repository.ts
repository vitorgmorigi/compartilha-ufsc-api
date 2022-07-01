import { None, Option } from "monapt";
import { DatabaseService } from "../../database/database";
import { fromDatabase, Item, ItemDatabase } from "../../models/item";

export class ListFeedRepository {
  constructor(private readonly database: DatabaseService) {}

  async list(privateCircleIds?: string[]): Promise<Item[]> {
    const publicItems = await this.database.find<ItemDatabase>("item", "circle.visibility", "public");

    const result: Item[] = [];

    let privateItems: Option<ItemDatabase[]> = None;

    if (privateCircleIds) {
      privateItems = await this.database.findIn<ItemDatabase>("item", "circle.id", privateCircleIds);
      
      privateItems.get().forEach(doc => {
        result.push(fromDatabase(doc));
      });
    }
    
    if (privateItems.isEmpty && publicItems.isEmpty) {
      return result;
    }

    publicItems.get().forEach(doc => {
      result.push(fromDatabase(doc));
    });


    return result;
  }

}