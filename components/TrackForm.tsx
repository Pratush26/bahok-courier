"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormValues = {
  trackId: string;
};

export default function TrackPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    const trackingId = data.trackId.trim();
    if (trackingId) {
      router.push(`/track?trackId=${trackingId}`);
    }
    reset();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center mx-6">
      <h1 className="text-4xl font-bold text-center fontgenos">Track Your Order Progress</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mt-8">
        <input
          type="text"
          placeholder="Enter tracking number"
          {...register("trackId", { required: "Tracking ID is required" })}
          className={`w-full p-2 border rounded ${errors.trackId ? "border-red-500" : "border-purple-900"}`}
        />
        {errors.trackId?.message && (
          <p className="text-red-500 text-sm">{errors.trackId.message}</p>
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
