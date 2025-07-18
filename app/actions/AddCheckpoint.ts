'use server';

import connectDB from "@/lib/dbConnect";
import ShippingDetailsModel from "@/models/ShippingDetails";
import { auth } from "@/auth";

type CheckPoint = {
  trackId: string;
  message: string;
};

export default async function AddCheckpoint(data: CheckPoint) {
  const session = await auth();

  const { trackId, message } = data;

  if (trackId) {
    try {
      await connectDB();
      const order = await ShippingDetailsModel.findById(trackId);

      const lastCheckpoint = order?.checkPoints?.length
        ? order.checkPoints[order.checkPoints.length - 1]
        : null;

      if (
        order?.order.distanceType !== "IntraLocal" &&
        lastCheckpoint?.place === session?.user.dutyPlace
      ) {
        return null;
      }
      else if (order) {
        order.checkPoints.push({
          place: session?.user.dutyPlace,
          message: message,
          ReceivingTime: new Date(),
          receivedBy: session?.user.email,
          status: true,
        });
        await order.save();
      }

      console.log("successfully updated");
    } catch (err) {
      console.error("Database error:", err);
    }
  }
}
