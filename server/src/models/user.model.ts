import mongoose from 'mongoose';
import type { User } from '../types';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 32
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 32
    },
    email: {
      type: String,
      required: true,
      max: 50
    },
    password: {
      type: String,
      required: true,
      min: 5
    },
    picturePath: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
