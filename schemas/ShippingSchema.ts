// schemas/shippingDetailsSchema.ts
import { distance } from "framer-motion";
import { z } from "zod";

export const shippingDetailsSchema = z.object({
  senderName: z.string().min(3, "Sender name must be at least 3 characters"),
  senderEmail: z.string().email("Invalid sender email address"),
  senderPhone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
    .min(10, "Sender phone number is too short")
    .max(15, "Sender phone number is too long"),
  senderAddress: z.string().min(5, "Sender address is too short"),
  senderCity: z.string().min(3, "Sender city is required"),
 senderCountry: z
  .string()
  .transform((val) => (val.trim() === "" ? undefined : val))
  .optional()
  .refine((val) => !val || val.length >= 3, {
    message: "Invalid country",
  }),

  recieverName: z.string().min(3, "Receiver name must be at least 3 characters"),
  recieverEmail: z
  .union([
    z.string().email("Invalid receiver email address"),
    z.literal("").transform(() => undefined),
  ])
  .optional(),
  recieverPhone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
    .min(10, "Receiver phone number is too short")
    .max(15, "Receiver phone number is too long"),
  recieverAddress: z.string().min(5, "Receiver address is too short"),
  recieverCity: z.string().min(3, "Receiver city is required"),
  recieverCountry: z
  .string()
  .transform((val) => (val.trim() === "" ? undefined : val))
  .optional()
  .refine((val) => !val || val.length >= 3, {
    message: "Invalid country",
  }),

  product: z.array(
    z.object({
      productType: z.string().min(4, "Give a valid product type").max(8, "Invalid product type"),
      desc: z.string().min(3, "Write a bit more").max(30, "Description is too long"),
      weight: z
        .string()
        .min(1, "Product weight is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Product weight must be a valid number")
        .max(10, "Product weight is too long"),
      amount: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number")
        .optional(),
    })
  ),

  order: z.object({
    orderId: z.string().min(5, "Invalid Order ID").max(18, "Order ID is too long").optional(),
    due: z.string().optional(),
    charge: z.number().min(1, "Invalid number"),
    estimatedTime: z.date(),
    distanceType: z.number().nullable(),
    approvedBy: z.string().email("Invalid Approver email address"),
  }),

  checkPoints: z.array(
    z.object({
      RecievingTime: z.date().optional(),
      place: z.string().min(3, "Place is required").optional(),
      message: z.string().min(3, "Write a bit more").max(30, "Message is too long").optional(),
      secretNote: z.string().min(3, "Write a bit more").max(20, "Secret note is too long").optional(),
      status: z.boolean().default(false).optional(),
      recievedBy: z.string().email("Invalid Reciever email address").optional(),
    })
  ),
});
