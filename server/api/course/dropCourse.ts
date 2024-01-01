import { MongoClient ,ObjectId} from 'mongodb';
import type { user } from '~/server/models/userModel';
import type { dropUpCourseReqeust,course } from '~/server/models/courseModel';


const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export default defineEventHandler(async (event) => {
  const dropUpInfo:dropUpCourseReqeust = await readBody(event);
  try {
    const db = client.db(dbName);
    const userCollection = db.collection<user>('user');

    const updateQuery = { studentId: dropUpInfo.studentId };
    const updateAction = {
      $pull: { courseList: new ObjectId(dropUpInfo.courseId) }, // 使用 $pull 來刪除特定的課程 _id
    };
    const result = await userCollection.updateOne(updateQuery, updateAction);
    console.log('result', result);

    if (result.modifiedCount > 0) {
        return { success: true, message: '課程刪除成功' };
      } else {
        return { success: false, message: '課程刪除失敗' };
      }
  } catch (err) {
    return { success: false, message: 'DB連線失敗' };
  }
});
