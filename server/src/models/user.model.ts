import mongoose from 'mongoose'
import type { User } from '../types'

const { Schema } = mongoose

const userSchema = new Schema<User>(
  {
    username: String,
    password: String
  },
  { timestamps: true }
)

const UserModel = mongoose.model<User>('Users', userSchema, 'users')

export default UserModel
