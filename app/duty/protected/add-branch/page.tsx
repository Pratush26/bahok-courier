import BranchForm from "../../components/BranchForm";
import connectDB from "@/lib/dbConnect";
import Branch from "@/models/Branch";

type BranchDetails = {
  division: string;
  name: string;
  available: boolean;
  phone: { number: string }[]; // ✅ Fix here
  address: string;
  _id: string;
};

interface PageProps {
  searchParams: Promise<{ _id?: string }>;
}
export default async function BranchFormPage({ searchParams }: PageProps) {
  let branchData: BranchDetails = {
    division: "",
    name: "",
    available: true,
    phone: [{ number: "" }], // ✅ match expected structure
    address: "",
    _id: "",
  };

  const { _id } = await searchParams;
  let editable = true;
  if (!_id) editable = false;
  else {
    try {
      await connectDB();
      const rawData = await Branch.findOne({ _id }).lean();
      if (rawData) {
        branchData = {
          ...rawData,
          _id: rawData._id.toString(),
          phone: rawData.phone.map((p: any) =>
            typeof p === "string" ? { number: p } : p
          ),
        } as BranchDetails;

        // const rawData = await Branch.findOne({ _id }).lean();
        //       if(rawData){
        //       branchData = {
        //         ...rawData,
        //         _id: rawData._id.toString(),
        //       } as BranchDetails;

        console.log("Branch Data from add-branch page:", branchData);
      }
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  }
  return (
    <main className="flex flex-col justify-center items-center min-h-[80vh]">
      <h1 className="text-3xl font-bold my-6">Create New Branch</h1>
      <BranchForm editable={editable} branchData={branchData} />
    </main>
  );
}
