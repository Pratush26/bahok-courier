import RegisterForm from "@/app/duty/components/CreateUser";

export default async function RegisterPage() {  
  
  return (
    <main className="flex flex-col justify-center items-center min-h-[80vh]">
      <h1 className="text-3xl font-bold my-6">Register New User</h1>
      <RegisterForm />
    </main>
  );
}