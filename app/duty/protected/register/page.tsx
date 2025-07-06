import RegisterForm from "@/app/duty/components/CreateUser";
import connectDB from "@/lib/dbConnect";
import BranchModel from "@/models/Branch";

type BranchDetails = {
  division: string;
  name: string;
  available: boolean;
  phone: string[];
  address: string;
};

export default async function RegisterPage() {
  let branchList: BranchDetails[] = [];

  try {
    await connectDB();
    branchList = (await BranchModel.find({ available: true }).lean()).map((branch) => ({
  ...branch,
  _id: branch._id.toString(), // convert ObjectId to string
}));

  } catch (error) {
    console.error("Error fetching branches:", error);
    return <p>Error loading branches</p>;
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-[80vh]">
      <h1 className="text-3xl font-bold my-6">Register New User</h1>
      <RegisterForm branchList={branchList} />
    </main>
  );
}
