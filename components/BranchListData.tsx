import connectDB from "@/lib/dbConnect";
import BranchModel from "@/models/Branch";
import BranchList from "./BranchList";

export default async function BranchListData() {
  try {
    await connectDB();
    const branchData = await BranchModel.find({ available: true }).lean();
    // Convert _id to string if needed
    const cleanData = branchData.map((b) => ({
      ...b,
      _id: b._id?.toString(),
    }));
    return <BranchList BranchData={cleanData} />;
  } catch (error) {
    console.error("Error fetching branches:", error);
    return <p className="text-red-500 text-center">Failed to load branch data.</p>;
  }
}
