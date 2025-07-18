import TrackPage from "@/components/TrackForm";
import connectDB from "@/lib/dbConnect";
import ShippingDetailsModel from "@/models/ShippingDetails";
import { auth } from "@/auth";

interface PageProps {
    searchParams: Promise<{ trackId?: string }>;
}

export default async function Track({ searchParams }: PageProps) {
    const { trackId } = await searchParams;  // <-- await here
    let order = null;
    const session = await auth()
    if (!session?.user) return null

    if (trackId) {
        try {
            await connectDB();
            order = await ShippingDetailsModel.findById(trackId);
        } catch (err) {
            console.error("Database error:", err);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <TrackPage pageUrl={"/duty/checkpoints"} />
            {trackId && (
                <div className="mt-10 w-full max-w-2xl bg-white p-6 rounded shadow">
                    {order ? (
                        <>
                            <h2 className="text-xl font-bold mb-4">Order Details</h2>
                            <p><b>Sender:</b> {order.senderName}</p>
                            <p><b>Receiver:</b> {order.receiverName}</p>
                            <p><b>Charge:</b> ৳{order.order.charge}</p>
                            <p><b>Estimated Time:</b> {new Date(order.order.estimatedTime).toLocaleDateString()}</p>
                            <p className="text-center font-bold">Status</p>
                            <hr className="mb-4" />
                            <section>
                                {order.checkPoints?.map((item, index) => {
                                    return (
                                        <div key={index} className={`${item.status ? "bg-purple-950" : "bg-gray-500"} text-gray-100 my-2 p-4 rounded-2xl`}>
                                            <p><b>Reached: </b>{item.place?.toString()}</p>
                                            <p><b>ReceivingTime: </b>{item.ReceivingTime && new Date(item.ReceivingTime).toLocaleString()}</p>
                                            <p>{item.message}</p>
                                        </div>
                                    );
                                })}
                            </section>
                        </>
                    ) : (
                        <p className="text-red-600 font-semibold">No order found with this tracking ID.</p>
                    )}
                </div>
            )}
        </main>
    );
}

