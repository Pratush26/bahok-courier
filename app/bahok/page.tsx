import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth"
import LoginPage from "@/components/LogInForm";

export default async function Meghlokh() {
    const session = await auth()
    if (!session) return <LoginPage />;
    return (
        <main className="flex flex-col justify-center items-center min-h-[80vh]">
            <section className="flex items-center justify-center m-6">
                <Image src={"/user.svg"} width={70} height={70} className="rounded-full" alt="user" />
                <h1 className="text-xl">{session.user?.name}&apos;s dashboard</h1>

            </section>
            <section className="flex flex-col sm:flex-row items-baseline justify-center gap-6">
                <Link className="hover:text-gray-500 transition-all duration-200 transition-discrete" href={"/duty/handle-order"}>Checkpoints</Link>
                <Link className="hover:text-gray-500 transition-all duration-200 transition-discrete" href={"/duty/ship"}>Ship</Link>
                {session.user.role === "admin" && 
                <span className="flex flex-col gap-2">
                    <Link className="hover:text-gray-500 transition-all duration-200 transition-discrete" href={"/duty/protected/register"}>Register New</Link>
                </span>
                }
                <form
                    action={async () => {
                        "use server"
                        await signOut()
                    }}
                >
                    <button type="submit" className="hover:text-gray-500 transition-all duration-200 transition-discrete cursor-pointer">Log Out</button>
                </form>
            </section>
        </main>
    )
}