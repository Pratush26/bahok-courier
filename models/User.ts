// models/User.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  phone: number;
  nid: number;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // add unique if needed
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  nid: { type: Number, required: true },
  role: { type: String, default: "employee" }
}, { timestamps: true });

// Avoid recompilation errors on hot reload (Next.js dev)
const User: Model<User> = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default User;
