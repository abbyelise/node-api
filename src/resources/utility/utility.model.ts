import { Schema, model } from "mongoose";
import Utility from '@/resources/utility/utility.interface';

const UtilitySchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  }, 
  { timestamps: true }
);

export default model<Utility>('Utility', UtilitySchema);
