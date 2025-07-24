import BranchForm from "../../components/BranchForm";

export default async function BranchFormPage() {

  return (
    <main className="flex flex-col justify-center items-center min-h-[80vh]">
      <h1 className="text-3xl font-bold my-6">Create New Branch</h1>
      <BranchForm />
    </main>
  );
}
