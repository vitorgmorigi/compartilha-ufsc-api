import { None, Option } from "monapt";
import { DatabaseService } from "../../database/database";
import { Circle, CircleDatabase, CircleVisibility, fromDatabase as circleFromDatabase } from "../../models/circle";
import { User, UserDatabase, fromDatabase, toDatabase } from "../../models/user";
import { UserProfile } from "../../services/login/contracts";

export class UserLoginRepository {
  constructor(private readonly database: DatabaseService) {}

  async get(login: string): Promise<Option<User>> {
    const user = await this.database.findByLogin<UserDatabase>("user", login);

    if (user.isDefined) {
      return Option(fromDatabase(user.get()));
    }

    return None;
  }

  async create(user: UserProfile | Omit<UserProfile, "score">): Promise<void> {
    await this.database.create("user", toDatabase(user));
  }

  async getPublicCircles(): Promise<Circle[]> {
    const publicCirclesOption = await this.database
      .find<CircleDatabase>("circle", "visibility", CircleVisibility.Public);

    if (publicCirclesOption.isDefined) {
      const publicCircles = publicCirclesOption.get();

      return publicCircles.map(circle => circleFromDatabase(circle));
    }

    return [];
  }

}