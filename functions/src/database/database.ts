export abstract class DatabaseService {
    public abstract getCollection: (collection: string) => unknown
}