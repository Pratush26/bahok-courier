import connectDB from "@/lib/dbConnect";
import ProductTypeModel from "@/models/ProductType";
import DistanceTypeModel from "@/models/DistanceType";

interface ProductType {
  type: string;
  value: number;
  article: string;
}

interface DistanceType {
  type: string;
  value: number;
  article: string;
}

export default async function Service() {
  let ProductType: ProductType[] = [];
  let DistanceType: DistanceType[] = [];

  try {
    await connectDB();
    ProductType = await ProductTypeModel.find().lean();
    DistanceType = await DistanceTypeModel.find().lean();
    console.log(ProductType);
  } catch (err) {
    console.error(err);
  }

  return (
    <main className="flex min-h-[80vh] w-full flex-col items-center justify-center overflow-x-auto">
      <div className="w-fit mx-auto px-2 md:px-0">
        <table className="table-auto border-separate border-spacing-1 border border-gray-800 md:w-3/4 w-full my-4 bg-purple-950 rounded-xl text-center shadow-lg/80 shadow-purple-950">
          <caption className="caption-top font-bold text-2xl sm:text-4xl m-6 fontgenos">
            <h1>
            Our Pricing List <small className="text-nowrap">(per kg)</small>
            </h1>
          </caption>
          <thead className="text-nowrap">
            <tr>
              <th className="rounded-lg border border-gray-800 p-4 text-white bg-gray-600/90">
                Product Type
              </th>
              {DistanceType.map((item, index) => (
                <th
                  key={index}
                  className="rounded-lg border border-gray-800 p-4 text-white bg-gray-600/90"
                >
                  {item.type}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-nowrap">
            {ProductType.map((item, index) => (
              <tr key={index}>
                <td className="rounded-lg border border-gray-800 p-4 bg-white hover:bg-purple-800 hover:text-gray-100">
                  {item.type}
                </td>
                {DistanceType.map((distance, i) => (
                  <td
                    key={i}
                    className="rounded-lg border border-gray-800 p-4 bg-white hover:bg-purple-800 hover:text-gray-100"
                  >
                    BDT - {Math.round((item.value + 30) * distance.value)}/=
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <article className="px-10 md:px-16 w-full my-4">
        <h2 className="text-center font-bold text-3xl my-4">Our Distance type system</h2>
        {DistanceType.map((item, index) => (
          <dl key={index}>
            <dt className="text-xl font-bold mb-1 mt-4">{item.type}</dt>
            <dd>{item.article}</dd>
          </dl>
        ))}
      </article>
      <article className="px-10 md:px-16 w-full my-4">
        <h3 className="text-center font-bold text-3xl my-4">Our Product type system</h3>
        {ProductType.map((item, index) => (
          <dl key={index}>
            <dt className="text-xl font-bold mb-1 mt-4">{item.type}</dt>
            <dd>{item.article}</dd>
          </dl>
        ))}
      </article>
    </main>
  );
}
