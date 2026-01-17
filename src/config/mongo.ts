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

/**
 * Ensures required indexes for leads collection
 */
export async function ensureIndexes(): Promise<void> {
  const db = getMongoDb();
  const collection = db.collection('leads');

  // Unique email
  await collection.createIndex(
    { email: 1 },
    { unique: true, name: 'unique_email' }
  );

  // Source (array / multikey)
  await collection.createIndex(
    { source: 1 },
    { name: 'idx_source' }
  );

  // Wildcard to any field within custom
  await collection.createIndex(
    { 'custom.$**': 1 },
    { name: 'idx_custom_wildcard' }
  );

  console.log('✅ Indexes ensured: unique_email, idx_source, idx_custom_wildcard');
}
