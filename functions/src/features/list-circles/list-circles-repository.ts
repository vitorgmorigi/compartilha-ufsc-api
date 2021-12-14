import { FirestoreService } from "../../database";
import { Circle } from "../../models/circle";

export class ListCirclesRepository {
  private db = FirestoreService.getInstance().getCollection("circle");

  async listAll(): Promise<Circle[]> {
    const snapshot = await this.db.get();
    const result: Circle[] = [];
    snapshot.forEach(doc => {
      result.push({ 
        id: doc.id, 
        createdBy: doc.data().created_by, 
        name: doc.data().name, 
        visibility: doc.data().visibility 
      });
    });

    return result;
  }

}