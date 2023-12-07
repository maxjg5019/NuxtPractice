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

    const exitUserCheck = await collection.findOne({
      studentId: userData.studentId,
    });
    if (exitUserCheck) {
      console.log('此帳號已存在');
      return {
        success: false,
        message: 'm 此帳號已存在',
      };
    }

    const result = await collection.insertOne({
      name: userData.name,
      studentId: userData.studentId,
      password: userData.password,
    });
    console.log('result', result);
    if (result.acknowledged) {
      console.log('註冊成功', result.insertedId);
      return {
        success: true,
        message: 'm 註冊成功',
      };
    } else {
      console.log('註冊失敗');
      return {
        success: false,
        message: 'm 註冊失敗',
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
