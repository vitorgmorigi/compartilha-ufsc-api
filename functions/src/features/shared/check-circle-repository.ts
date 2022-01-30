import { Option } from "monapt";
import { DatabaseService } from "../../database/database";
import { CircleDatabase } from "../../models/circle";

export class CheckCircleRepository {
  constructor(protected readonly database: DatabaseService) {}

  async check(circleName: string): Promise<Option<CircleDatabase>> {
    return this.database.findOne<CircleDatabase>("circle", "name", circleName);
  }
}