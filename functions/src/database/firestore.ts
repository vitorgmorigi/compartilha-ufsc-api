import * as admin from "firebase-admin";
import { DatabaseService } from "./database";

export class FirestoreService implements DatabaseService {
    private static instance: FirestoreService;

    public static getInstance(): FirestoreService {
      if (!FirestoreService.instance) {
        FirestoreService.instance = new FirestoreService();
      }
      
      return FirestoreService.instance;
    }

    public async searchByNameOrListAll<T extends { id: string }>(collection: string, name?: string): Promise<T[]> {
      const db = this.getCollection(collection);
      const snapshot = name ? 
        await db.where("name_as_array", "array-contains", name).get() : 
        await db.get();

      const result: T[] = [];

      snapshot.forEach((doc) => result.push({
        id: doc.id,
        ...doc.data()
      } as T));

      return result;
    }

    public async create<T>(collection: string, object: T): Promise<void> {
      await this.getCollection(collection).add(object);
    }

    public getCollection(collection: string): FirebaseFirestore.CollectionReference {
      return admin.firestore().collection(collection);
    }
}