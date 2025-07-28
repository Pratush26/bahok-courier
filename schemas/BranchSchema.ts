// schemas/branchSchema.ts
import { z } from "zod"

export const branchSchema = z.object({
    division: z
        .string({ required_error: "Division name is required" })
        .min(3, "Division name must be at least 3 characters")
        .max(16, "Division name must be less than 17 characters"),
    name: z
        .string({ required_error: "Branch name is required" })
        .min(3, "Branch name must be at least 3 characters")
        .max(26, "Branch name must be less than 27 characters"),
    available: z
        .boolean()
        .default(true)
        .optional(),
    phone: z.array(
        z.object({
            number: z
                .string({ required_error: "Phone number is required" })
                .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
                .min(11, "Phone number must be at least 11 characters")
                .max(11, "Phone number must be 11 characters"),
        })
    ).min(1, "At least one phone number is required"),
    address: z
        .string({ required_error: "Address is required" })
        .min(3, "Address must be more than 2 characters")
        .max(56, "Address must be less than 57 characters"),
})