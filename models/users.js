import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePictureUrl: String,
    username: String,
    nickname: String,
    phoneNumber: Number,
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

export default User;
