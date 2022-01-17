import { None, Option } from "monapt";
import { DatabaseService } from "../../database/database";
import { Circle, CircleDatabase, fromDatabase } from "../../models/circle";


export class JoinInACircleRepository {
  constructor(private readonly database: DatabaseService) {}

  async join(userId: string, circleId: string): Promise<void> {
    await this.database.updateFieldArray("user", userId, "circles", circleId);
  }

  async findCircle(circleId: string): Promise<Option<Circle>> {
    const circle = await this.database.findOne<CircleDatabase>("circle", "id", circleId);

    if (circle.isDefined) {
      return Option(fromDatabase(circle.get()));
    }

    return None;
  }
}