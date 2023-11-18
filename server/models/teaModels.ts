import { Collection, MongoClient, Document } from 'mongodb';
import { Tea } from '../../interfaces/Tea';

import db from '../db';
const teajourneyCollection: Collection<Document> = db
  .db('teajourney')
  .collection('teas');

//add try-catch block to async function with error handling
async function getTea(): Promise<Document[]> {
  try {
    await db.connect(); //redundant to connect everytime?
    const res: Document[] = await teajourneyCollection.find({}).toArray();
    return res;
  } catch (error) {
    throw new Error('Error getting teas: ' + (error as Error).message);
  }
}
//added try-catch block to async function with error handling
//added Tea interface instead of any to body
async function postTea(body: Tea): Promise<any> {
  try {
    if (!body) return new Error();
    await db.connect(); //redundant to connect everytime?
    const res = await teajourneyCollection.insertOne({
      ...body,
      _id: undefined,
    });
    return res;
  } catch (error) {
    throw new Error('Error posting tea: ' + (error as Error).message);
  }
}

export { getTea, postTea };
