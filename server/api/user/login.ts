import { MongoClient } from 'mongodb';
import type { user } from '~/server/models/userModel';

const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export default defineEventHandler(async (event) => {
  const userData = await readBody(event);
  console.log('userData', userData);
  try {
    const db = client.db(dbName);
    const collection = db.collection<user>('user');
    const result = await collection.findOne({
      studentId: userData.studentId,
      password: userData.password,
    });
    if (result) {
      console.log('登入成功');
      return {
        success: true,
        message: 'm 登入成功',
      };
    } else {
      console.log('登入失敗');
      return {
        success: false,
        message: 'm 登入失敗',
      };
    }
  } catch (err) {
    console.log('DB連線失敗', err);
    return {
      success: false,
      message: 'm DB連線失敗',
    };
  }
});
