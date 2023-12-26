import { MongoClient } from 'mongodb';
import type { course } from '~/server/models/courseModel';

const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export default defineEventHandler(async (event) => {
  const { originalName, originalTeacher, newData } = await readBody(event);
  try {
    const db = client.db(dbName);
    const collection = db.collection<course>('course');

    // 檢查是否存在衝突的課程
    const conflict = await collection.findOne({
      name: newData.name,
      teacher: newData.teacher,
      _id: { $ne: newData._id } // 排除自身
    });

    if (conflict) {
      return { success: false, message: '存在同名稱同教師的課程' };
    }

    const result = await collection.updateOne(
      { name: originalName, teacher: originalTeacher },
      { $set: newData }
    );

    if (result.modifiedCount > 0) {
      return { success: true, message: '更新成功' };
    } else {
      return { success: false, message: '未找到相符課程' };
    }
  } catch (err) {
    return { success: false, message: 'DB連線失敗' };
  }
});
