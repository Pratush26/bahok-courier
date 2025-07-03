import RegisterForm from "@/app/duty/components/CreateUser";
import connectDB from "@/lib/dbConnect";
import BranchModel from "@/models/Branch";

type BranchDetails = {
  name: string;
  available: boolean;
  phone: string[];
  address: string;
};

type DivisionBranch = {
  division: string;
  branches: BranchDetails[];
};

export default async function RegisterPage() {
  let branchList: DivisionBranch[] = [];

  try {
    await connectDB();
    branchList = await BranchModel.aggregate([
  {
    $project: {
      division: 1,
      branches: {
        $filter: {
          input: "$branches",
          as: "branch",
          cond: { $eq: ["$$branch.available", true] }
        }
      }
    }
  }
]);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }

// Flatten branches with division name
  const allBranches = branchList.flatMap((division) =>
    division.branches.map((branch) => ({
      branch: branch.name,
    }))
  );
  console.log("Available branches:", allBranches);
  return (
    <main className="flex flex-col justify-center items-center min-h-[80vh]">
      <h1 className="text-3xl font-bold my-6">Register New User</h1>
      <RegisterForm branchList={allBranches} />
    </main>
  );
}