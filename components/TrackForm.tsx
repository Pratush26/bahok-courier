"use client";
import { useForm } from "react-hook-form";

type FormValues = {
  taskName: string;
};

export default function TrackPage() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center mx-6">
      <h1 className="text-4xl font-bold text-center fontgenos">Track Your Order Progress</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          reset();
        })}
        className="w-full max-w-md mt-8"
      >
          <input
            type="text"
            placeholder="Enter tracking number"
            {...register("taskName", { required: "Task name is required" })}
            className={`w-full p-2 border rounded ${
              errors.taskName ? "border-red-500" : "border-purple-900"
            }`}
          />
          {errors.taskName?.message && (
            <p className="text-red-500 text-sm">{errors.taskName.message}</p>
          )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-700 text-white font-bold my-4 py-2 rounded hover:bg-purple-800 transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
