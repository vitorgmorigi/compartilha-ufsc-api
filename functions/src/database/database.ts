import { Option } from "monapt";

export abstract class DatabaseService {
    public abstract getCollection: (collection: string) => unknown
    public abstract searchByNameOrListAll: <T extends { id: string }>(collection: string, name?: string) => Promise<T[]>
    public abstract create: <T extends { id: string }>(collection: string, object: T) => Promise<void>
    public abstract find: <T extends { id: string }>(collection: string, field: string, value: unknown) 
    => Promise<Option<T[]>>
    public abstract findOne: <T extends { id: string }>(collection: string, field: string, value: unknown) 
    => Promise<Option<T>>
    public abstract findByLogin: <T extends { id: string }>(collection: string, name?: string) => Promise<Option<T>>
    public abstract update: <T>(collection: string, docId: string, object: T) => Promise<void>
    public abstract updateFieldArray: <T>(collection: string, docId: string, field: string, value: T) => Promise<void>
}