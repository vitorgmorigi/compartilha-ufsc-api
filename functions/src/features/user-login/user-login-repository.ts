import { None, Option } from "monapt";
import { DatabaseService } from "../../database/database";
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

  async create(user: UserProfile): Promise<void> {
    await this.database.create("user", toDatabase(user));
  }

}