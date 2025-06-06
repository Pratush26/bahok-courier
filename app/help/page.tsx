import Image from "next/image";

export default function Help() {
    return (
        <main className="flex min-h-screen flex-wrap items-center justify-center gap-4">
            <Image
                src="https://images.pexels.com/photos/7682340/pexels-photo-7682340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Help Image"
                width={500}
                height={200}
                className="rounded-lg m-4"
            />
            <section className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl text-center font-bold fontgenos">Contact to our customer service</h1>
                <p className="font-medium text-center">For any queries or support, please reach out to us:</p>
            <ul className="list-disc list-inside">
                <li>Phone: 032435843907</li>
                <li>Email:bahok@2dhfgmail.com</li>
            </ul>
            </section>
        </main>
    );
}