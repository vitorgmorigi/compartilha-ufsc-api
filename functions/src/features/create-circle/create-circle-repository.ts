import { DatabaseService } from "../../database/database";
import { Circle, toDatabase } from "../../models/circle";

export class CreateCircleRepository {
  constructor(private readonly database: DatabaseService) {}

  async create(circle: Circle): Promise<void> {
    await this.database.create("circle", toDatabase(circle));
  }
}