// schemas/shippingDetailsSchema.js
import { z } from "zod";

export const shippingDetailsSchema = z.object({
    sendername: z.string().min(3, "Sender name must be at least 3 characters"),
    senderemail: z.string().email("Invalid sender email address"),
    senderphone: z
        .string().regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
        .min(10, "Sender phone number is too short")
        .max(15, "Sender phone number is too long"),
    senderaddress: z
        .string()
        .min(5, "Sender address is too short")
        .optional(),
    sendercity: z.string().min(2, "Sender city is required"),
    senderstate: z.string().min(2, "Sender state is required"),
    senderpostalCode: z
        .string()
        .min(4, { message: "Postal code must be at least 4 digits" })
        .max(10, { message: "Postal code must be at most 10 digits" })
        .regex(/^\d+$/, { message: "Postal code must contain only digits" }),

    productdetails: z.string().min(3, "Product details must not be empty"),
    productweight: z
        .string()
        .min(1, "Product weight is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Product weight must be a valid number")
        .max(10, "Product weight is too long"),
    recievername: z
        .string()
        .min(3, "Receiver name must be at least 3 characters"),
    recieveremail: z.string().email("Invalid receiver email address").optional(),
    recieverphone: z
        .string().regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
        .min(10, "Receiver phone number is too short")
        .max(15, "Receiver phone number is too long"),
    recieveraddress: z
        .string()
        .min(5, "Receiver address is too short")
        .optional(),
    recievercity: z.string().min(2, "Receiver city is required"),
    recieverstate: z.string().min(2, "Receiver state is required"),
    recieverpostalCode: z
        .string()
        .min(4, { message: "Postal code must be at least 4 digits" })
        .max(10, { message: "Postal code must be at most 10 digits" })
        .regex(/^\d+$/, { message: "Postal code must contain only digits" }),
});
