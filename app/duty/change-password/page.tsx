import PasswordManager from "../components/ManagePassword";

export default async function ChangePassword() {

  return (
    <main className="flex flex-col justify-center items-center min-h-[80vh]">
      <h1 className="text-3xl font-bold my-6">Edit User</h1>
      <PasswordManager />
    </main>
  );
}
