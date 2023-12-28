import { MongoClient } from 'mongodb';
import type { course } from '~/server/models/courseModel';

const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export default defineEventHandler(async (event) => {
  const courseData: course = await readBody(event);
  try {
    const db = client.db(dbName);
    const collection = db.collection<course>('course');

    const courseExist = await collection.findOne({
      name: courseData.name,
      teacher: courseData.teacher,
    });

    if (courseExist) {
      return { success: false, message: '此課程已存在' };
    }

    const result = await collection.insertOne(courseData);

    console.log('result', result);

    if (result.acknowledged) {
      return { success: true, message: '新增成功' };
    } else {
      return { success: false, message: '新增失敗' };
    }
  } catch (err) {
    return { success: false, message: 'DB連線失敗' };
  }
});
