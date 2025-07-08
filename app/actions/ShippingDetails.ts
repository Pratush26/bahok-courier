'use server';

import connectDB from "@/lib/dbConnect";
import ShippingDetailsModel from "@/models/ShippingDetails";
import { shippingDetailsSchema } from "@/schemas/ShippingSchema";
import { Types } from "mongoose";
import { z } from "zod";

// Type derived from schema
type UserInput = z.infer<typeof shippingDetailsSchema>;

export async function createShipping(formData: UserInput) {
  try {
    await connectDB();

    // ✅ Validate form data using Zod
    const data = shippingDetailsSchema.parse(formData);

    // ✅ Save to MongoDB
    const newShipping = await ShippingDetailsModel.create({
      senderName: data.senderName,
      senderEmail: data.senderEmail,
      senderPhone: data.senderPhone,
      senderAddress: data.senderAddress,
      senderCity: data.senderCity,
      senderCountry: data.senderCountry ?? undefined,

      recieverName: data.recieverName,
      recieverEmail: data.recieverEmail ?? undefined,
      recieverPhone: data.recieverPhone,
      recieverAddress: data.recieverAddress,
      recieverCity: data.recieverCity,
      recieverCountry: data.recieverCountry ?? undefined,

      product: data.product,

      order: {
        due: data.order.due ?? undefined,
        charge: data.order.charge,
        estimatedTime: data.order.estimatedTime,
        distanceType: data.order.distanceType,
        approvedBy: data.order.approvedBy,
      },

      checkPoints: data.checkPoints,
    });

    return {
  success: true,
  trackingId: (newShipping._id as Types.ObjectId).toString(),
};

  } catch (error: unknown) {
    console.error("Create user error:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Unknown error" };
  }
}
