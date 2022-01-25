import { Option } from "monapt";
import { DatabaseService } from "../../database/database";
import { CategoryDatabase } from "../../models/category";

export class CheckCategoryRepository {
  constructor(protected readonly database: DatabaseService) {}

  async check(categoryName: string): Promise<Option<CategoryDatabase>> {
    return this.database.findOne<CategoryDatabase>("category", "name", categoryName);
  }
}