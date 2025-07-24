import PasswordManager from "../components/ManagePassword";

export default async function ChangePassword() {

  return (
    <main className="flex flex-col justify-center items-center min-h-[80vh]">
      <h1 className="text-3xl font-bold my-6">Change Password</h1>
      <PasswordManager />
    </main>
  );
}
