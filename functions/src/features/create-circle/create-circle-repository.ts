import { FirestoreService } from "../../database";
import { transformToArray } from "../../helpers/array";
import { Circle, CircleDatabase } from "../../models/circle";



export class CreateCircleRepository {
  private db = FirestoreService.getInstance().getCollection("circle");

  private toDatabase(circle: Circle): CircleDatabase {
    return {
      created_by: circle.createdBy,
      name: circle.name,
      name_as_array: transformToArray(circle.name),
      password: circle.password,
      visibility: circle.visibility
    };
  }

  async create(circle: Circle): Promise<void> {
    await this.db.add(this.toDatabase(circle));
  }
}