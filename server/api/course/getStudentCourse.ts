import { MongoClient, ObjectId } from 'mongodb';
import type { course } from '~/server/models/courseModel';
import type { user } from '~/server/models/userModel';

const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export default defineEventHandler(async (event) => {
  const requestStudentId = await readBody(event);
  try {
    const db = client.db(dbName);
    const studentCollection = db.collection<user>('user');
    const courseCollection = db.collection<course>('course');

    const findStudent = await studentCollection.findOne({
      studentId: requestStudentId.studentId,
    });
    if (findStudent == null) {
      return { success: false, message: '查無此學生' };
    } else {
      const courseId = findStudent.courseList.map((id) => new ObjectId(id));
      const getCourseData = await courseCollection
        .find({
          _id: { $in: courseId },
        })
        .toArray();

      if (getCourseData.length === 0) {
        return {
          success: false,
          data: getCourseData,
          message: '課程搜尋失敗',
        };
      } else {
        return {
          success: true,
          data: getCourseData,
          message: '課程搜尋成功',
        };
      }
    }
  } catch (err) {
    console.log('err', err);
    return { success: false, message: 'DB連線失敗' };
  }
});
