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
    const courseCollection = db.collection<course>('course');
      
      const getCourseData = await courseCollection.find().toArray();
      if(getCourseData == null){
        console.log('所有課程搜尋失敗', getCourseData);
        return { success: true, message: '所有課程查詢成功-Test' };
      }else{
        console.log('所有課程搜尋成功', getCourseData);
        return { success: true, message: '所有課程查詢成功-Test' };
      }
      
  } catch (err) {
    return { success: false, message: 'DB連線失敗' };
  }
});
