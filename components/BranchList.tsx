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

export default async function BranchList() {
  let branchList: DivisionBranch[] = [];

  try {
    await connectDB();
    branchList = await BranchModel.find({ "branches.available": true }).lean();
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }

  // Flatten branches with division name
  const allBranches = branchList.flatMap((doc) =>
  doc.branches.filter((branch) => branch.available)
);

return (
    <table className="table-auto border-separate border-spacing-1 border border-gray-800 md:w-3/4 w-11/12 my-4 bg-purple-950 rounded-lg text-center shadow-xl/80 shadow-purple-950">
        <caption className="caption-top font-bold text-4xl m-6 fontgenos">
          Our Branch List
        </caption>
        <thead>
          <tr>
            <th className="border border-gray-800 p-2 text-white bg-purple-900/80 hidden sm:table-cell">SL no.</th>
            <th className="border border-gray-800 p-2 text-white bg-purple-900/80">Branch Name</th>
            <th className="border border-gray-800 p-2 text-white bg-purple-900/80">Address</th>
            <th className="border border-gray-800 p-2 text-white bg-purple-900/80">Contact</th>
          </tr>
        </thead>
        <tbody>
          {allBranches.length > 0 ? (
            allBranches.map((branch, index) => (
              <tr
                key={`${branch.name}-${index}`}
                className={index % 2 === 0 ? "bg-white/90 text-gray-700" : "bg-gray-600/80 text-white"}
              >
                <td className="border border-gray-800 p-2 hidden sm:table-cell">{String(index + 1).padStart(2, "0")}</td>
                <td className="border border-gray-800 p-2">{branch.name}</td>
                <td className="border border-gray-800 p-2">{branch.address}</td>
                <td className="border border-gray-800 p-2">{branch.phone.join(", ")}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-white">No branches found in the database.</td>
            </tr>
          )}
        </tbody>
      </table>
    );
}