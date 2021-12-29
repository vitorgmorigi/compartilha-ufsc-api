import { FirestoreService } from "../../database";
import { Circle } from "../../models/circle";

export class ListCirclesRepository {
  private db = FirestoreService.getInstance().getCollection("circle");

  private fromDatabase(circleDb: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>): Circle {
    return { 
      id: circleDb.id, 
      createdBy: circleDb.data().created_by, 
      name: circleDb.data().name, 
      visibility: circleDb.data().visibility 
    };
  }

  async listAll(): Promise<Circle[]> {
    const snapshot = await this.db.get();
    const result: Circle[] = [];
    snapshot.forEach(doc => {
      result.push(this.fromDatabase(doc));
    });

    return result;
  }

}