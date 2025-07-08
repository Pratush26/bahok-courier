import TrackPage from "@/components/TrackForm";
import connectDB from "@/lib/dbConnect";
import ShippingDetailsModel from "@/models/ShippingDetails";
import { notFound } from "next/navigation";

interface Props {
  searchParams: { trackId?: string };
}

export default async function Track({ searchParams }: Props) {
  const trackId = searchParams.trackId;

  let order = null;

  if (trackId) {
    try {
      await connectDB();
      order = await ShippingDetailsModel.findById(trackId).lean();
    } catch (err) {
      console.error("Database error:", err);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <TrackPage />
      {trackId && (
        <div className="mt-10 w-full max-w-2xl bg-white p-6 rounded shadow">
          {order ? (
            <>
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              <p><strong>Sender:</strong> {order.senderName}</p>
              <p><strong>Receiver:</strong> {order.recieverName}</p>
              <p><strong>Status:</strong> {order.checkPoints?.[order.checkPoints.length - 1]?.message || "Pending"}</p>
              <p><strong>Charge:</strong> ৳{order.order.charge}</p>
              <p><strong>Estimated Time:</strong> {new Date(order.order.estimatedTime).toLocaleDateString()}</p>
            </>
          ) : (
            <p className="text-red-600 font-semibold">No order found with this tracking ID.</p>
          )}
        </div>
      )}
    </main>
  );
}
