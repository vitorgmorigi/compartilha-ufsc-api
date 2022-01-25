import { DatabaseService } from "../../database/database";
import { Category, toDatabase } from "../../models/category";
import { CheckCategoryRepository } from "../shared/check-category-repository";

export class CreateCategoryRepository extends CheckCategoryRepository {
  constructor(protected readonly database: DatabaseService) {
    super(database);
  }

  async create(category: Category): Promise<void> {
    await this.database.create("category", toDatabase(category));
  }
}