'use server';

import connectDB from "@/lib/dbConnect";
import ShippingDetailsModel from "@/models/ShippingDetails";
import { auth } from "@/auth";

type CheckPoint = {
  trackId: string;
  message?: string;
  secretNote?: string;
};
type CheckPointType = {
  place: string;
  ReceivingTime: Date;
  status: boolean;
  receivedBy: string;
  message?: string;
  secretNote?: string;
};

export async function AddCheckpoint(data: CheckPoint) {
  const session = await auth();
  const { trackId, message, secretNote } = data;

  if (!session || !trackId) return null;

  try {
    await connectDB();
    const order = await ShippingDetailsModel.findById(trackId);
    if (!order) return null;

    const lastCheckpoint = order.checkPoints?.length
      ? order.checkPoints[order.checkPoints.length - 1]
      : null;

    if (lastCheckpoint?.place === session.user.dutyPlace) {
      if(!lastCheckpoint.status){
        // ✅ Update only defined fields
        if (message) lastCheckpoint.message = message;
        if (secretNote) lastCheckpoint.secretNote = secretNote;
        lastCheckpoint.ReceivingTime = new Date();
        lastCheckpoint.receivedBy = session.user.email;
        lastCheckpoint.status = true;
        await order.save();
      }return null;
    } else {
      // ✅ Create a new checkpoint with only defined fields
      const newCheckpoint: CheckPointType = {
        place: session.user.dutyPlace,
        ReceivingTime: new Date(),
        status: true,
        receivedBy: session.user.email,
      };

      if (message) newCheckpoint.message = message;
      if (secretNote) newCheckpoint.secretNote = secretNote;

      order.checkPoints.push(newCheckpoint);
      await order.save();
    }

    console.log("Checkpoint successfully updated or added.");
  } catch (err) {
    console.error("Database error:", err);
  }
}

export async function UpdateCheckpoint(data: CheckPoint) {
  const session = await auth();
  const { trackId, message, secretNote } = data;

  if (!session || !trackId) return null;

  try {
    await connectDB();
    const order = await ShippingDetailsModel.findById(trackId);
    if (!order) return null;

    const lastCheckpoint = order.checkPoints?.length
      ? order.checkPoints[order.checkPoints.length - 1]
      : null;

    if (lastCheckpoint?.place === session.user.dutyPlace) {
        // ✅ Update only defined fields
        if (message) lastCheckpoint.message = message;
        if (secretNote) lastCheckpoint.secretNote = secretNote;
        lastCheckpoint.receivedBy = session.user.email;
        lastCheckpoint.status = true;
        await order.save();
    }
  } catch (err) {
    console.error("Database error:", err);
  }
}