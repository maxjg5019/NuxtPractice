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

    const findStudent = await studentCollection.find();

    if (findStudent) {
      console.log('所有學生搜尋完畢', findStudent);
      
      const getCourseData = await courseCollection.find({
        
      }).toArray();
    } else {
      return { success: false, message: '查無此學生' };
    }
  } catch (err) {
    return { success: false, message: 'DB連線失敗' };
  }
});
