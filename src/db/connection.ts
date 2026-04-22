import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

export const connectToDatabase = async (uri: string, dbName: string): Promise<void> => {
  if (client) return;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log(`Connected to database: ${dbName}`);
};

export const getDb = (): Db => {
  if (!db) throw new Error('Database not initialized. Call connectToDatabase first.');
  return db;
};

export const closeConnection = async (): Promise<void> => {
  if (client) await client.close();
};