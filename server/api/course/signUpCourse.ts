import { MongoClient, ObjectId } from 'mongodb';
import type { user } from '~/server/models/userModel';
import type { course } from '~/server/models/courseModel';
import type { signUpCourseReqeust } from '~/server/models/courseModel';

const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export default defineEventHandler(async (event) => {
  const signUpInfo: signUpCourseReqeust = await readBody(event);
  try {
    const db = client.db(dbName);
    const userCollection = db.collection<user>('user');
    const courseCollection = db.collection<course>('course');
    const courseExistQuery = {
      studentId: signUpInfo.studentId,
      courseList: {
        $in: [new ObjectId(signUpInfo.courseId)],
      },
    };

    const courseExist = await userCollection.findOne(courseExistQuery);
    if (courseExist) {
      return { success: false, message: '想新增的課程已修習' };
    }

    const courseData = await courseCollection.findOne({
      _id: new ObjectId(signUpInfo.courseId),
    });

    const checkCourseConflict = async (
      courseData: course,
      userCourses: string[]
    ) => {
      // 從課程資料表中獲取所有使用者已選擇課程的詳細資料
      const userCourseDetails = await courseCollection
        .find({
          _id: { $in: userCourses.map((id) => new ObjectId(id)) },
        })
        .toArray();

      // 檢查每個已選課程的時間是否與新課程衝突
      for (const userCourse of userCourseDetails) {
        for (const userCourseDate of userCourse.courseDate) {
          for (const newCourseDate of courseData.courseDate) {
            if (
              userCourseDate.weekDay === newCourseDate.weekDay &&
              userCourseDate.period === newCourseDate.period
            ) {
              return `衝突時間: 星期${newCourseDate.weekDay}第${newCourseDate.period}節`;
            }
          }
        }
      }
      return null;
    };

    const userDoc = await userCollection.findOne({
      studentId: signUpInfo.studentId,
    });
    const userCourses = userDoc?.courseList.map((id) => id.toString()) || [];

    const conflictMessage = await checkCourseConflict(courseData!, userCourses);
    if (conflictMessage) {
      return { success: false, message: conflictMessage };
    }

    const updateQuery = { studentId: signUpInfo.studentId };
    const updateAction = {
      $addToSet: { courseList: new ObjectId(signUpInfo.courseId) }, // 使用$addToSet來確保不會添加重複的課程_id
    };
    const result = await userCollection.updateOne(updateQuery, updateAction);

    console.log('result', result);

    if (result.matchedCount === 1 && result.modifiedCount === 1) {
      return { success: true, message: '課程加入成功' };
    } else if (result.matchedCount === 0) {
      return { success: false, message: '未找到相應的使用者' };
    } else {
      return { success: false, message: '課程新增失敗' };
    }
  } catch (err) {
    return { success: false, message: 'DB連線失敗' };
  }
});
