import * as admin from "firebase-admin";

import { DatabaseService } from "../../database/database";

export class UpdateScoreUserRepository {
  constructor(protected readonly database: DatabaseService) {}

  async updateUserScore(userId: string, incrementScore: number): Promise<void> {
    return this.database.update("user", userId, { 
      score: admin.firestore.FieldValue.increment(incrementScore) 
    });
  }
}