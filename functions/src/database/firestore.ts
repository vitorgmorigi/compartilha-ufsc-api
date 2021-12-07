import * as admin from "firebase-admin";
import { DatabaseService } from "./database";

export class FirestoreService implements DatabaseService {
    private static instance: FirestoreService;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static getInstance(): FirestoreService {
      if (!FirestoreService.instance) {
        FirestoreService.instance = new FirestoreService();
      }
      
      return FirestoreService.instance;
    }

    public getCollection(collection: string): FirebaseFirestore.CollectionReference {
      return admin.firestore().collection(collection);
    }
}