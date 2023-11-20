import mongoose from "mongoose";

export default async (_connectDB:any) =>  {

    const config = useRuntimeConfig();

    mongoose.connect(config.MONGODB_URI)
            .then(() => console.log('Connected to MongoDB'))
            .catch((err) => console.log(err));
};
