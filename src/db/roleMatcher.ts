import { getDb } from './connection';


export const insertDocument = async <T>(collectionName: string, data: T) => {
    try {
        const db = getDb();
        const result = await db.collection(collectionName).insertOne({
            ...(data as any),
            createdAt: new Date()
        });
        return result;
    } catch (error) {
        console.error(`[DB Error] Failed to insert into ${collectionName}:`, error);
        throw new Error('Database operation failed');
    }
};


export const findDocument = async <T>(collectionName: string, query: object): Promise<T | null> => {
    try {
        const db = getDb();
        const result = await db.collection(collectionName).findOne(query);
        return result as T | null;
    } catch (error) {
        console.error(`[DB Error] Failed to find in ${collectionName}:`, error);
        throw new Error('Database query failed');
    }
};