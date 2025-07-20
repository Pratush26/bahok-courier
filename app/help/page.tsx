import Image from "next/image";
import Link from "next/link";

export default function Help() {
    return (
        <main className="flex min-h-screen flex-wrap lg:flex-nowrap items-center justify-center gap-4">
            <Image
                src="https://images.pexels.com/photos/7682340/pexels-photo-7682340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Help Image"
                width={500}
                height={200}
                className="rounded-lg m-4"
            />
            <section className="flex flex-col items-center justify-center gap-4 w-5/6 mx-auto lg:w-1/2">
                <h1 className="text-4xl text-center font-bold fontgenos">Contact to our customer service</h1>
                <p className="font-medium text-center">For any queries or support, please reach out to us:</p>
                <ul className="list-disc list-inside">
                    <li>Phone: 032435843907</li>
                    <li>Email:bahok@2dhfgmail.com</li>
                    <li>
                        You can access our every branch if you face any branch related quaries or need to contact any of our branch.<br />
                        <a href="/about#branch-list" className="underline hover:text-gray-600 transition-colors duration-300">
                            Click here to get the branch details
                        </a>
                    </li>

                </ul>
            </section>
        </main>
    );
}