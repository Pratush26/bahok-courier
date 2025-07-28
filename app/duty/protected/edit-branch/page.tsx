import FindBranch from "../../components/FindBranch";
import connectDB from "@/lib/dbConnect";
import Branch from "@/models/Branch";

export default async function branchEditingPage() {
  let branchList: { _id: string; name: string }[] = [];

  try {
    await connectDB();

    const branches = await Branch.find({}, { name: 1 }).lean();

    branchList = branches.map((branch: any) => ({
      _id: branch._id.toString(), // Convert ObjectId to string
      name: branch.name,
    }));
  } catch (error) {
    console.error("Database connection error:", error);
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-[80vh]">
      <h1 className="text-3xl font-bold my-6">Edit Branch Data</h1>
      <FindBranch branchName={branchList} />
    </main>
  );
}
