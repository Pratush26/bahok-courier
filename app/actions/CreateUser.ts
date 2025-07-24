'use server';

import connectDB from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { userSchema } from "@/schemas/userSchema";
import { m } from "framer-motion";

// Type derived from schema
type UserInput = z.infer<typeof userSchema>;

type UpdatePasswordInput = {
  email: string;
  Oldpassword: string;
  password: string;
  confirmPassword: string;
}

type UpdateUserDataInput = {
  _id: string;
  email: string;
  phone: number;
  dutyPlace: string;
  role: string;
}
// createUser function
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
      dutyPlace: data.dutyPlace,
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

// Update password function
export async function UpdatePassword(formData: UpdatePasswordInput) {
  try {
    await connectDB();

    const { email, Oldpassword, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match." };
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return { success: false, message: "User not found!" };
    }

    const isMatch = await bcrypt.compare(Oldpassword, existingUser.password);
    if (!isMatch) {
      return { success: false, message: "Old password is incorrect!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    existingUser.password = hashedPassword;
    await existingUser.save();

    return { success: true, message: "Password successfully updated" };
  } catch (error: unknown) {
    console.error("Update password error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Unknown error" };
  }
}

// Update user data function
export async function UpdateUserData(formData: UpdateUserDataInput) {
  try {
    await connectDB();

    const { _id, email, phone, dutyPlace, role } = formData;

    const dbUser = await User.findOne({ _id });
    if (!dbUser) {
      return { success: false, message: "User not found!" };
    }
    if(dbUser.email !== email) dbUser.email = email;
    if(dbUser.phone !== phone) dbUser.phone = phone;
    if(dbUser.dutyPlace !== dutyPlace) dbUser.dutyPlace = dutyPlace;
    if(dbUser.role !== role) dbUser.role = role;
    await dbUser.save();

    return { success: true, message: "Password successfully updated" };
  } catch (error: unknown) {
    console.error("Update password error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Unknown error" };
  }
}

// Delete user function
export async function deleteUser(email: string) {
  try {
    await connectDB();
    const dbUser = await User.findOne({ email: email });
    if (!dbUser) {
      return { success: false, message: "User not found" };
    }
    await User.deleteOne({email: email});
    return { success: true, message: "User deleted successfully" };
  } catch (error: unknown) {
    console.error("Create user error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Unknown error" };
  }
}