import { DatabaseService } from "../../database/database";
import { Circle, CircleDatabase, fromDatabase } from "../../models/circle";

export class ListCirclesRepository {
  constructor(private readonly database: DatabaseService) {}

  async list(name?: string): Promise<Circle[]> {
    const circles = await this.database.searchByNameOrListAll<CircleDatabase>("circle", name);
    const result: Circle[] = [];
    circles.forEach(doc => {
      result.push(fromDatabase(doc));
    });

    return result;
  }

}