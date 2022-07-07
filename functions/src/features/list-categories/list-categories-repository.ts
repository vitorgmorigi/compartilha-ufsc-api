import { DatabaseService } from "../../database/database";
import { Category } from "../../models/category";
import { CategoryDatabase, fromDatabase } from "../../models/category";

export class ListCategoriesRepository {
  constructor(private readonly database: DatabaseService) {}

  async list(): Promise<Category[]> {
    const categories = await this.database.getAllDocuments<CategoryDatabase>("category");
    
    const result: Category[] = [];

    if (categories.isEmpty) {
      return result;
    }

    categories.get().forEach(doc => {
      result.push(fromDatabase(doc));
    });

    return result;
  }
}