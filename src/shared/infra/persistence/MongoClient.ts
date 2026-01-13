import { Db, Collection, Document } from 'mongodb';
import { DatabaseClient } from './DatabaseClient';
import { getMongoDb } from '../../../config/mongo';

/**
 * MongoDB implementation of DatabaseClient
 *
 * Connection lifecycle is handled at application bootstrap level
 * (see config/mongo.ts)
 */
export class MongoDatabaseClient implements DatabaseClient {
  private readonly db: Db;

  constructor() {
    this.db = getMongoDb();
  }

  /**
   * No-op
   * MongoDB connection is established globally during bootstrap
   */
  async connect(): Promise<void> {
    return;
  }

  /**
   * No-op
   * MongoDB disconnection is handled globally on shutdown
   */
  async disconnect(): Promise<void> {
    return;
  }

  /**
   * Returns a MongoDB collection
   * @param name Collection name
   */
  getCollection<T extends Document>(name: string): Collection<T> {
    return this.db.collection<T>(name);
  }
}
