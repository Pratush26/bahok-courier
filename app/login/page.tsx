import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";
import { auth } from "@/auth";

export default async function Login() {
  const session = await auth();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {session ? (
          <div className="text-center mb-4">
            <p className="text-lg">Welcome back!</p>
            <SignOut />
          </div>
        ) : (
          <div className="text-center mb-4">
            <p className="text-lg">Please sign in to continue</p>
            <SignIn />
          </div>
        )}
      </div>
    </div>
  ); 
}
