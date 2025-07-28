import FindUser from "../../components/FindUser";

export default async function userEditingPage() {

  return (
    <main className="flex flex-col justify-center items-center min-h-[80vh]">
      <h1 className="text-3xl font-bold my-6">Edit User</h1>
      <FindUser />
    </main>
  );
}
