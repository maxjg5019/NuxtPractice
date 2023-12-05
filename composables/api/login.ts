import { MongoClient } from 'mongodb';
import { usertype } from '~/server/models/userModel';
import type { user } from '~/server/models/userModel';

const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export const loginUserData = async () => {
  try {
    const db = client.db(dbName);
    const collection = db.collection<user>('user');
    await collection.insertOne({
      name: 'testUser',
      studentId: '31',
      email: '',
      type: usertype.master,
    });
    console.log('資料插入成功');
  } catch (err) {
    console.log('資料插入失敗', err);
  }
};