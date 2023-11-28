import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  },
);

const User = mongoose.model('User', userSchema); //對應 User 資料表

export default User;