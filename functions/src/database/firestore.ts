import * as admin from "firebase-admin";
import { firestore } from "firebase-admin";
import { Option } from "monapt";
import { FirestoreOperators } from "../helpers/firestore-operators";
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

    public async getAllDocuments<T extends { id: string }>(collection: string): Promise<Option<T[]>> {
      const db = this.getCollection(collection);
      const snapshot = await db.get();

      const result: T[] = [];

      snapshot.forEach((doc) => result.push({
        id: doc.id,
        ...doc.data()
      } as T));

      return Option(result);
    }

    public async find<T extends { id: string }>(
      collection: string,
      field: string, 
      value: unknown
    ): Promise<Option<T[]>> {
      const db = this.getCollection(collection);
      const snapshot = await db.where(field, FirestoreOperators.EQUAL, value).get();

      const result: T[] = [];

      snapshot.forEach((doc) => result.push({
        id: doc.id,
        ...doc.data()
      } as T));

      return Option(result);
    }

    public async findIn<T extends { id: string }>(
      collection: string,
      field: string, 
      value: unknown
    ): Promise<Option<T[]>> {
      const db = this.getCollection(collection);
      const snapshot = await db.where(field, FirestoreOperators.IN, value).get();

      const result: T[] = [];

      snapshot.forEach((doc) => result.push({
        id: doc.id,
        ...doc.data()
      } as T));

      return Option(result);
    }

    public async findV2<T extends { id: string }>(
      collection: string,
      filters: {
        field: string,
        operator: FirestoreOperators,
        value: unknown
      } [],
      sort?: {
        field: string,
        direction: "asc" | "desc"
      }
    ): Promise<Option<T[]>> {
      const db = this.getCollection(collection);

      const query = Object.entries(filters)
        .reduce((acc, filter) => acc.where(filter[1].field, filter[1].operator, filter[1].value), 
        db as firestore.Query<firestore.DocumentData>);
      
      if (sort) {
        query.orderBy(sort.field, sort.direction);
      }

      const snapshot = await query.get();

      const result: T[] = [];

      snapshot.forEach((doc) => result.push({
        id: doc.id,
        ...doc.data()
      } as T));

      return Option(result);
    }

    public async findOne<T extends { id: string }>(
      collection: string, 
      field: string, 
      value: unknown
    ): Promise<Option<T>> {
      const db = this.getCollection(collection);
      const snapshot = await db.where(field, FirestoreOperators.EQUAL, value).get();

      const result: T[] = [];

      snapshot.forEach((doc) => result.push({
        id: doc.id,
        ...doc.data()
      } as T));

      return Option(result[0]);
    }

    public async findByLogin<T extends { id: string }>(collection: string, login?: string): Promise<Option<T>> {
      const db = this.getCollection(collection);
      const snapshot = await db.where("login", FirestoreOperators.EQUAL, login).get();

      const result: T[] = [];

      snapshot.forEach((doc) => result.push({
        id: doc.id,
        ...doc.data()
      } as T));

      return Option(result[0]);
    }

    public async create<T extends { id: string }>(collection: string, object: T): Promise<void> {
      await this.getCollection(collection).doc(object.id).set(object);
    }

    public async update<T>(collection: string, docId: string, object: T): Promise<void> {
      const doc = this.getCollection(collection).doc(docId);

      await doc.update(object);
    }

    public async updateFieldArray<T>(collection: string, docId: string, field: string, value: T): Promise<void> {
      const doc = this.getCollection(collection).doc(docId);

      try {
        await doc.update({ [field]: firestore.FieldValue.arrayUnion(value) });
      } catch (error) {
        console.error(error);
        
        throw error;
      }
    }

    public getCollection(collection: string): FirebaseFirestore.CollectionReference {
      return admin.firestore().collection(collection);
    }
}