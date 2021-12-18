import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

import User from '@/resources/user/user.interface';
import { NextFunction } from "express";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false, // oauth is a possibility
    },
    role: {
      type: String,
      required: true,
    },
  }, 
  { timestamps: true }
);

// always hash the password before storing
UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hashed = await bcrypt.hash(this.password, 10);
  this.password = hashed;

  return next();
});

UserSchema.methods.isValidPassword = async function (password: string): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
}

export default model<User>('User', UserSchema);
