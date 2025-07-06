import Image from "next/image";
import BranchList from "@/components/BranchList";
import { Suspense } from "react";

export default async function BranchInfo() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center mx-6">
      <h1 className="text-5xl font-bold fontgenos mt-6 text-center">About Us</h1>

      <section className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 mx-4">
        <Suspense fallback={<div className="flex items-center justify-center w-3/4 h-[250px] bg-purple-300 animate-pulse rounded-lg my-4">Loading imgs...</div>}>
        <Image
          src="https://images.pexels.com/photos/4175032/pexels-photo-4175032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Delivery Image"
          width={400}
          height={400}
          className="mt-6 mb-4 rounded-lg shadow-xl/50 shadow-purple-950"
          />
          </Suspense>
        <p className="text-black text-center md:w-3/4 w-11/12 fonttinos italic text-xl">
          We offer the fastest and safest delivery services, not only within 48 districts across the country but also internationally. Our dedicated team is always ready to provide you with the best service possible. Since 2004, we have been improving the transportation system for our customers. Our branches are conveniently located in various areas to ensure easy access to our services. Here is a list of our branches:
        </p>
      </section>
      <Suspense fallback={<div className="flex items-center justify-center w-3/4 h-[70vh] bg-purple-950 animate-pulse rounded-lg my-4">Loading branches...</div>}>
        <BranchList />
      </Suspense>
    </main>
  );
}
