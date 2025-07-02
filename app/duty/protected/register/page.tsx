import RegisterForm from "@/app/duty/components/CreateUser";
import { notFound } from "next/navigation";
export default async function RegisterPage() {
//   const session = await auth();
//   if (session?.user.role !== "admin") {
//       notFound(); // ✅ Show 404 without redirecting
//     }
  
  return (
    <main className="flex flex-col justify-center items-center min-h-[80vh]">
      <h1 className="text-3xl font-bold my-6">Register New User</h1>
      <RegisterForm />
    </main>
  );
}