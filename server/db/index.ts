import mongoose from "mongoose";

export default async () =>  {
    const config = useRuntimeConfig();
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('DB 連線成功')
    }catch(err){
        console.error('DB 連線失敗', err);
    }
};
