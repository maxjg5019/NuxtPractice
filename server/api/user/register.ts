import { MongoClient, ObjectId } from 'mongodb';
import type { user } from '~/server/models/userModel';

const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export default defineEventHandler(async (event) => {
  const userData: user = await readBody(event);
  try {
    const db = client.db(dbName);
    const collection = db.collection<user>('user');

    const userExist = await collection.findOne({
      studentId: userData.studentId,
    });
    if (userExist) {
      return { success: false, message: '此帳號已存在' };
    } else {
      const result = await collection.insertOne({
        name: userData.name,
        studentId: userData.studentId,
        password: userData.password,
        courseList: [],
      });

      console.log('result', result);

      if (result.acknowledged) {
        return { success: true, message: '註冊成功' };
      } else {
        return { success: false, message: '註冊失敗' };
      }
    }
  } catch (err) {
    return { success: false, message: 'DB連線失敗' };
  }
});
