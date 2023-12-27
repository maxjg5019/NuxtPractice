import { MongoClient, ObjectId } from 'mongodb';
import type { course } from '~/server/models/courseModel';

const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export default defineEventHandler(async (event) => {
  const courseId: ObjectId = await readBody(event);
  try {
    const db = client.db(dbName);
    const collection = db.collection<course>('course');

    const result = await collection.deleteOne({
      _id: courseId,
    });

    if (result.acknowledged) {
      return { success: true, message: '刪除成功' };
    } else {
      return { success: false, message: '未找到相符課程' };
    }
  } catch (err) {
    return { success: false, message: 'DB連線失敗' };
  }
});
