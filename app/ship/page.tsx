const pricingList = [
  {
    productType: "Document",
    interCity: "60",
    interDivision: "80",
    international: "100"
  },
  {
    productType: "Electronics",
    interCity: "90",
    interDivision: "120",
    international: "220"
  },
  {
    productType: "Books",
    interCity: "60",
    interDivision: "40",
    international: "60"
  }
];
export default function Service() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center overflow-hidden">
      <table className="table-auto border-separate border-spacing-1 border border-gray-800 md:w-3/4 w-11/12 my-4 bg-purple-950 rounded-xl text-center shadow-lg/80 shadow-purple-950">
        <caption className="caption-top font-bold text-4xl m-6 fontgenos">
          Our Pricing List <small className="text-nowrap">(per kg)</small>
        </caption>
        <thead>
          <tr>
            <th className="rounded-lg border border-gray-800 p-2 text-white bg-gray-600/90">Product Type</th>
            <th className="rounded-lg border border-gray-800 p-2 text-white bg-gray-600/90">Inter city</th>
            <th className="rounded-lg border border-gray-800 p-2 text-white bg-gray-600/90">Inter division</th>
            <th className="rounded-lg border border-gray-800 p-2 text-white bg-gray-600/90">Inter national</th>
          </tr>
        </thead>
        <tbody>
          {pricingList.map((item, index) => (
            <tr key={index}>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">{item.productType}</td>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">BDT - {item.interCity}/=</td>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">BDT - {item.interDivision}/=</td>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">BDT - {item.international}/=</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}