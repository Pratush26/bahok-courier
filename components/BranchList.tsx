"use client";
import { useForm } from "react-hook-form";

interface BranchDataType {
  _id?: string;
  division: string;
  name: string;
  available: boolean;
  phone: string[];
  address: string;
}

export default function BranchList({ BranchData }: { BranchData: BranchDataType[] }) {
  const { register, watch } = useForm();
  const searchQuery = watch("search") || "";

  const filteredDocs = BranchData.filter((it) =>
    [it.name, it.address].some((field) =>
      String(field || "").toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <section className="flex items-center justify-center w-full flex-col">
      {/* Search bar */}
      <form className="flex items-center justify-center w-full mt-6">
        <input
          type="text"
          {...register("search")}
          placeholder="Search by branch name or address...."
          className="w-11/12 md:w-1/2 px-4 py-2 rounded-xl text-black bg-white placeholder:text-gray-700 border border-purple-300 shadow-lg/50 shadow-purple-950"
        />
      </form>

      {/* Table */}
      <table
        id="branch-list"
        className="table-auto border-separate border-spacing-1 border border-gray-800 md:w-3/4 w-11/12 my-4 bg-purple-950 rounded-lg text-center shadow-xl/80 shadow-purple-950"
      >
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
          {filteredDocs.length > 0 ? (
            filteredDocs.map((branch, index) => (
              <tr
                key={`${branch.name}-${index}`}
                className={index % 2 === 0 ? "bg-white/90 text-gray-700" : "bg-gray-600/80 text-white"}
              >
                <td className="border border-gray-800 p-2 hidden sm:table-cell">{index + 1}</td>
                <td className="border border-gray-800 p-2">{branch.name}</td>
                <td className="border border-gray-800 p-2">{branch.address}</td>
                <td className="border border-gray-800 p-2">{branch.phone.join(", ")}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-white">
                No branches found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
