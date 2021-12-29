import { DatabaseService } from "../../database/database";
import { Circle, CircleDatabase, fromDatabase } from "../../models/circle";

export class ListCirclesRepository {
  constructor(private readonly database: DatabaseService) {}
  // private db = FirestoreService.getInstance().getCollection("circle");

  async list(name?: string): Promise<Circle[]> {
    // const snapshot = name ? await this.db.where("name_as_array", "array-contains", name).get() : await this.db.get();

    const circles = await this.database.searchByNameOrListAll<CircleDatabase>("circle", name);
    const result: Circle[] = [];
    circles.forEach(doc => {
      result.push(fromDatabase(doc));
    });

    return result;
  }

}