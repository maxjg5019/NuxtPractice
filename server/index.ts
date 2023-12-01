import { MongoClient } from 'mongodb';

const config = useRuntimeConfig();
const client = new MongoClient(config.MONGODB_URI);

export default async () => {
  try {
    await client.connect();
    console.log('連線成功');
  } catch (err) {
    console.log('連線失敗', err);
  }
};
