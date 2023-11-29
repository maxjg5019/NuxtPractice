import { MongoClient } from 'mongodb';

const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);
const dbName = 'dbFinal';

export default async () => {
  try {
    await client.connect();
    console.log('連線成功');
    const db = client.db(dbName);
    const collection = db.collection('user');
  } catch (err) {
    console.log('連線失敗', err);
  };
};
