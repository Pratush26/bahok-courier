import Image from "next/image";

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
  {
    address: "Downtown, Barisal",
    contact: "4455667788, 8899001122",
  },
  {
    address: "Central Plaza, Rangpur",
    contact: "5566778899, 9900112233",
  },
  {
    address: "Near Railway Station, Bogura",
    contact: "6677889900, 0011223344",
  },
  {
    address: "City Mall, Narayanganj",
    contact: "7788990011, 1122334455",
  },
  {
    address: "Main Road, Comilla",
    contact: "8899001122, 2233445566",
  },
  // Add more branches as needed
];

export default function BranchInfo() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center mx-6">
      <h1 className="text-5xl font-bold fontgenos mt-6 text-center">
        About Us
      </h1>
      <section className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 mx-4">
        <Image
          src="https://images.pexels.com/photos/4175032/pexels-photo-4175032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt={"Delivery Image"}
          width={400}
          height={400}
          className="mt-6 mb-4 rounded-lg shadow-xl/50 shadow-purple-950"
        />
        <p className="text-black text-center md:w-3/4 w-11/12 fonttinos italic text-xl">
          We offer the fastest and safest delivery services, not only within 50 districts across the country but also internationally. Our dedicated team is always ready to provide you with the best service possible. Since 2004, we have been improving the transportation system for our customers. Our branches are conveniently located in various areas to ensure easy access to our services. Here is a list of our branches:
        </p>
      </section>
      <table className="table-auto border-separate border-spacing-1 border border-gray-800 md:w-3/4 w-11/12 my-4 bg-purple-950 rounded-lg text-center shadow-xl/80 shadow-purple-950">
        <caption className="caption-top font-bold text-4xl m-6 fontgenos">
          Our Branch List
        </caption>
        <thead>
          <tr>
            <th className="border border-gray-800 p-2 text-white bg-purple-900/80">SL no.</th>
            <th className="border border-gray-800 p-2 text-white bg-purple-900/80">Branch Address</th>
            <th className="border border-gray-800 p-2 text-white bg-purple-900/80">Contact Details</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white/90 text-gray-700" : "bg-gray-600/80 text-white"}
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
