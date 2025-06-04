type Branch = {
  address: string;
  contact: string;
};

const branches: Branch[] = [
  {
    address: "Beside ruma bus station, Bandarban sadar",
    contact: "432089579043, 432089579043",
  },
  {
    address: "Opposite to Sonali Bank, Muradpur, Chittagong",
    contact: "432089579043, 432089579043",
  },
  {
    address: "Near Central Park, Dhaka",
    contact: "1234567890, 0987654321",
  },
  {
    address: "City Center, Sylhet",
    contact: "1122334455, 5566778899",
  },
  {
    address: "Main Street, Rajshahi",
    contact: "2233445566, 6677889900",
  },
  {
    address: "Market Square, Khulna",
    contact: "3344556677, 7788990011",
  },
  // Add more branches as needed
];

export default function BranchInfo() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center mx-6">
    <table className="table-auto border-separate border-spacing-1 border border-gray-800 w-3/4 bg-purple-950 rounded-lg text-center">
      <caption className="caption-top font-bold text-4xl m-6 fontgenos">
        Our Branch List
      </caption>
      <thead>
        <tr>
          <th className="border border-gray-800 p-2 text-white bg-purple-800">SL no.</th>
          <th className="border border-gray-800 p-2 text-white bg-purple-800">Branch Address</th>
          <th className="border border-gray-800 p-2 text-white bg-purple-800">Contact Details</th>
        </tr>
      </thead>
      <tbody>
        {branches.map((branch, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-gray-100 text-gray-700" : "bg-gray-700 text-white"}
          >
            <td className="border border-gray-800 p-2">{String(index + 1).padStart(2, "0")}</td>
            <td className="border border-gray-800 p-2">{branch.address}</td>
            <td className="border border-gray-800 p-2">{branch.contact}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </main>
  );
}
