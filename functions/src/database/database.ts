import { Option } from "monapt";

export abstract class DatabaseService {
    public abstract getCollection: (collection: string) => unknown
    public abstract searchByNameOrListAll: <T extends { id: string }>(collection: string, name?: string) => Promise<T[]>
    public abstract create: <T>(collection: string, object: T) => Promise<void>
    public abstract findByLogin: <T extends { id: string }>(collection: string, name?: string) => Promise<Option<T>>
}