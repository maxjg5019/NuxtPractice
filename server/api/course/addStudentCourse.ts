import { MongoClient } from 'mongodb';
import type { studentCourse } from '~/server/models/courseModel';

const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export default defineEventHandler(async (event) => {
  const courseData: studentCourse = await readBody(event);
  try {
    const db = client.db(dbName);
    const collection = db.collection<studentCourse>('studentCourses');

    const courseExistQuery = {
      studentId: courseData.studentId,
      courseList: {
        $elemMatch: {
          courseName: { $in: courseData.courseList.map((c) => c.courseName) },
        },
      },
    };

    const courseExist = await collection.findOne({ courseExistQuery });
    if (courseExist) {
      return { success: false, message: '想新增的課程已修習' };
    }

    //#region 雙for查詢有無衝堂 (可顯示衝堂確切時間)
    for (const newCourse of courseData.courseList) {
      for (const newCourseDate of newCourse.courseDate) {
        const courseConflict = await collection.findOne({
          studentId: courseData.studentId,
          courseList: {
            $elemMatch: {
              courseDate: {
                $elemMatch: {
                  weekDay: newCourseDate.weekDay,
                  period: newCourseDate.period,
                },
              },
            },
          },
        });

        if (courseConflict) {
          return {
            success: false,
            message: `衝突: ${newCourse.courseName} 在星期${newCourseDate.weekDay}的第${newCourseDate.period}節已有課程`,
          };
        }
      }
    }
    //#endregion

    //#region 用聚合查詢有無衝堂
    // const conflictPipeline = [
    //   {
    //     $match: { studentId: courseData.studentId },
    //   },
    //   {
    //     $unwind: '$courseList',
    //   },
    //   {
    //     $unwind: '$courseList.courseDate',
    //   },
    //   {
    //     $match: {
    //       'courseList.courseDate.weekDay': {
    //         $in: courseData.courseList.flatMap((c) =>
    //           c.courseDate.map((d) => d.weekDay)
    //         ),
    //       },
    //       'courseList.courseDate.period': {
    //         $in: courseData.courseList.flatMap((c) =>
    //           c.courseDate.map((d) => d.period)
    //         ),
    //       },
    //     },
    //   },
    // ];

    // const conflicts = await collection.aggregate(conflictPipeline).toArray();

    // if (conflicts.length > 0) {
    //   return { success: false, message: `有課程衝堂了` };
    // }
    //#endregion

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
