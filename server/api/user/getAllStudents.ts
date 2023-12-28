import { MongoClient } from 'mongodb';
import type { user } from '~/server/models/userModel';

const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export default defineEventHandler(async (event) => {
  const userData = await readBody(event);
  try {
    const db = client.db(dbName);
    const collection = db.collection<user>('user');

    const userListResult = await collection.find().toArray();

    if (userListResult == null) {
      return {
        success: true,
        data: userListResult,
        message: '學生列表取得失敗',
      };
    } else {
      return {
        success: false,
        data: userListResult,
        message: '學生列表取得成功',
      };
    }
  } catch (err) {
    return {
      success: false,
      message: 'DB連線失敗',
    };
  }
});
