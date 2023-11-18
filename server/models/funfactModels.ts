import { Collection, Document } from 'mongodb';
import db from '../db';

const funfactCollection: Collection<Document> = db
  .db('teajourney')
  .collection('funfacts');

async function getFunfact(): Promise<Document[]> {
  try {
    await db.connect();
    const res: Document[] = await funfactCollection.find({}).toArray();
    return res;
  } catch (error) {
    throw new Error('Error getting funfacts: ' + (error as Error).message);
  }
}

export { getFunfact };
