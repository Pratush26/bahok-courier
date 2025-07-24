// models/User.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  nid: string;
  role: string;
  dutyPlace: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // add unique if needed
  password: { type: String, required: true },
  phone: { type: String, required: true },
  nid: { type: String, required: true },
  role: { type: String, default: "employee", enum: ["employee","manager","editor","admin"] },
  dutyPlace: { type: String, required: true },
}, { timestamps: true });

// Avoid recompilation errors on hot reload (Next.js dev)
const User: Model<User> = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default User;
