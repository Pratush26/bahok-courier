// schemas/userSchema.ts
import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("📧 Please enter a valid email"),
  password: z.string().min(6, "🔒 Password must be at least 6 characters"),
})

export type LoginFormData = z.infer<typeof loginSchema>
