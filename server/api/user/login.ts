import { MongoClient } from 'mongodb';
import { usertype } from '~/server/models/userModel';
import type { user } from '~/server/models/userModel';
import type { formState as userData } from '~/composables/api/user';


const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export default defineEventHandler (async (event) => {
    const { userData } = await readBody(event);
    try {
        const db = client.db(dbName);
        const collection = db.collection<user>('user');
        await collection.insertOne({
          name: userData.name,
          studentId: userData.studentId,
          password: userData.password,
          usertype: usertype.student,
        });
        console.log('資料插入成功');
      } catch (err) {
        console.log('資料插入失敗', err);
      }
});
