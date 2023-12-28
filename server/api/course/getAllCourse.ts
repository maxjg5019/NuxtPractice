import { MongoClient } from 'mongodb';
import type { course } from '~/server/models/courseModel';

const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export default defineEventHandler(async () => {
  try {
    const db = client.db(dbName);
    const courseCollection = db.collection<course>('course');

    const getCourseData = await courseCollection.find().toArray();
    if (getCourseData == null) {
      return {
        success: false,
        data: getCourseData,
        message: '所有課程搜尋失敗',
      };
    } else {
      return {
        success: true,
        data: getCourseData,
        message: '所有課程搜尋成功',
      };
    }
  } catch (err) {
    return {
      success: false,
      message: 'DB連線失敗',
    };
  }
});
