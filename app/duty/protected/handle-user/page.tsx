import EditUser from "../../components/EditUser";
import connectDB from "@/lib/dbConnect";
import User from "@/models/User";
import BranchModel from "@/models/Branch";

type BranchDetails = {
  division: string;
  name: string;
  available: boolean;
  phone: string[];
  address: string;
  _id: string;
};

interface PageProps {
  searchParams?: { email?: string };
}

export default async function EditUserPage({ searchParams }: PageProps) {
  const email = searchParams?.email;

  if (!email) {
    return (
      <p className="min-h-screen flex items-center justify-center font-bold text-2xl">
        Email not provided
      </p>
    );
  }

  let branchList: BranchDetails[] = [];
  let usr = null;

  try {
    await connectDB();

    const rawUser = await User.findOne({ email }).lean();

    if (!rawUser) {
      return (
        <p className="min-h-screen flex items-center justify-center font-bold text-2xl">
          User not found
        </p>
      );
    }

    usr = {
      ...rawUser,
      _id: rawUser._id.toString(),
      createdAt: rawUser.createdAt?.toISOString(),
      updatedAt: rawUser.updatedAt?.toISOString(),
    };

    branchList = (await BranchModel.find({ available: true }).lean()).map((branch) => ({
      ...branch,
      _id: branch._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <p className="min-h-screen flex items-center justify-center text-red-600 font-bold">
        Error loading data
      </p>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-[80vh]">
      <h1 className="text-3xl font-bold my-6">Edit User</h1>
      <EditUser branchList={branchList} user={usr} />
    </main>
  );
}
