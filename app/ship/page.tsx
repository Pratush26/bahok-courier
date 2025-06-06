import ShippingForm from "@/components/ShippingForm";

export default function Service() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <table className="table-auto border-separate border-spacing-1 border border-gray-800 md:w-3/4 w-11/12 my-4 bg-purple-950 rounded-xl text-center shadow-lg/80 shadow-purple-950">
        <caption className="caption-top font-bold text-4xl m-6 fontgenos">
          Our Pricing List
        </caption>
        <thead>
          <tr>
            <th className="rounded-lg border border-gray-800 p-2 text-white bg-gray-600/90">Shipping</th>
            <th className="rounded-lg border border-gray-800 p-2 text-white bg-gray-600/90">1kg charge</th>
            <th className="rounded-lg border border-gray-800 p-2 text-white bg-gray-600/90">3kg charge</th>
            <th className="rounded-lg border border-gray-800 p-2 text-white bg-gray-600/90">6kg charge</th>
            <th className="rounded-lg border border-gray-800 p-2 text-white bg-gray-600/90">10kg charge</th>
          </tr>
        </thead>
        <tbody>
            <tr className="">
              <td className="rounded-lg border border-gray-800 p-2 bg-white">Intercity</td>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">BDT-40/=</td>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">BDT-60/=</td>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">BDT-80/=</td>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">BDT-100/=</td>
            </tr>
            <tr className="">
              <td className="rounded-lg border border-gray-800 p-2 bg-white">national</td>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">BDT-60/=</td>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">BDT-90/=</td>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">BDT-120/=</td>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">BDT-220/=</td>
            </tr>
            <tr className="">
              <td className="rounded-lg border border-gray-800 p-2 bg-white">international</td>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">BDT-240/=</td>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">BDT-360/=</td>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">BDT-440/=</td>
              <td className="rounded-lg border border-gray-800 p-2 bg-white">BDT-660/=</td>
            </tr>
        </tbody>
      </table>
      <ShippingForm />
    </main>
  );
}