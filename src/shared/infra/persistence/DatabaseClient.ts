export interface DatabaseClient {
    connect(): Promise<void>;
    disconnect(): Promise<void>;

    getCollection<T>(name: string): unknown;
}