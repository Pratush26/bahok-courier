import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="grid grid-cols-1 sm:grid-cols-2 justify-items-center items-center gap-6 w-full min-h-[80vh] px-16">
        <span className="flex flex-col justify-center items-baseline font-bold fontgenos text-black gap-2 order-2 md:order-1">
          <h2 className="text-4xl text-black dark:text-[#8c7f96]">Ship your percel now through</h2>
          <h1 className="text-8xl dark:text-purple-600 text-purple-800 flex items-baseline flex-col md:gap-4 lg:flex-row">Bahok <p className="text-3xl">courier-service</p></h1>
          <h2 className="text-4xl text-black dark:text-[#8c7f96]">to enjoy fast and safe delivery experience</h2>
        </span>
        <Image
          src="/delivery-man.png"
          alt="Next.js Logo"
          width={400}
          height={400}
          className="order-1 md:order-2"
        />
      </section>
    </main>
  );
}
