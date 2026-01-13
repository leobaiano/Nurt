import { MongoClient, Db } from 'mongodb';
import { env } from './env';

let client: MongoClient | null = null;
let database: Db | null = null;

/**
 * Connects to MongoDB
 * Should be called once during application bootstrap
 */
export async function connectMongo(): Promise<void> {
  if (client) {
    return;
  }

  client = new MongoClient(env.mongoUri);

  await client.connect();

  // ✅ FIX: define explicitamente o nome da base
  database = client.db(env.mongoDbName);

  console.log(`🍃 MongoDB connected to database: ${env.mongoDbName}`);
}

/**
 * Returns the connected database instance
 * Throws if accessed before connection
 */
export function getMongoDb(): Db {
  if (!database) {
    throw new Error('MongoDB not connected');
  }

  return database;
}

/**
 * Gracefully closes MongoDB connection
 */
export async function disconnectMongo(): Promise<void> {
  if (!client) {
    return;
  }

  await client.close();

  client = null;
  database = null;

  console.log('🍂 MongoDB disconnected');
}
