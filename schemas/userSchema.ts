// schemas/userSchema.ts
import { z } from "zod"

export const userSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be less than 20 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(11, "Phone number must be more than 8 characters")
    .max(12, "Phone number must be less than 32 characters"),
  nid: z
    .string({ required_error: "NID is required" })
    .min(8, "NID number must be more than 8 characters")
    .max(32, "NID number must be less than 32 characters"),
  role: z
    .string({ required_error: "Role is required" })
    .min(3, "role must be more than 2 characters")
    .max(8, "role must be less than 8 characters"),
    dutyPlace: z
    .string({ required_error: "Duty place is required" })
    .min(3, "role must be more than 2 characters")
    .max(14, "role must be less than 15 characters"),
})
