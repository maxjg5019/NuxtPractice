import { MongoClient } from 'mongodb';
import type { course } from '~/server/models/courseModel';
import type { user } from '~/server/models/userModel';

const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export default defineEventHandler(async (event) => {
  const requestStudentId:string = await readBody(event);
  try {
    const db = client.db(dbName);
    const studentCollection = db.collection<user>('user');
    const courseCollection = db.collection<course>('course');

    const findStudent = await studentCollection.findOne({
      studentId: requestStudentId,
    });

    if (findStudent) {
      console.log('學生搜尋成功', findStudent);
      
      const getCourseData = await courseCollection.find({
        _id: findStudent.courseList,
      }).toArray();
      console.log('課程搜尋成功', getCourseData);
        return { success: true, message: '特定學生查詢成功-Test' };
    } else {
      return { success: false, message: '查無此學生' };
    }
  } catch (err) {
    return { success: false, message: 'DB連線失敗' };
  }
});
