import { MongoClient, ObjectId } from 'mongodb';
import type { course } from '~/server/models/courseModel';
import type { user } from '~/server/models/userModel';

const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export default defineEventHandler(async (event) => {
  const { courseId } = await readBody(event);
  console.log('courseId', courseId);

  try {
    const db = client.db(dbName);
    const courseCollection = db.collection<course>('course');
    const userCollection = db.collection<user>('user');
    const deleteResult  = await courseCollection.deleteOne({ _id: new ObjectId(courseId) });

    if (deleteResult .deletedCount === 0) {
      return { success: false, message: '未找到課程' };
    }

    const updateResult = await userCollection.updateMany(
      { courseList: new ObjectId(courseId) },
      { $pull: { courseList: new ObjectId(courseId) } }
    );

    if (updateResult.modifiedCount > 0) {
      return { success: true, message: '課程刪除成功，用戶修課列表已更新' };
    } else {
      return { success: true, message: '課程刪除成功，但無需更新用戶修課列表' };
    }
  } catch (err) {
    return { success: false, message: 'DB連線失敗' };
  }
});
