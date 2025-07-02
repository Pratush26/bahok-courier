'use server';

import connectDB from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { userSchema } from "@/schemas/userSchema";

// Type derived from schema
type UserInput = z.infer<typeof userSchema>;

export async function createUser(formData: UserInput) {
  try {
    await connectDB();
    const data = userSchema.parse(formData);

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      nid: data.nid,
      role: data.role,
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Create user error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Unknown error" };
  }
}
