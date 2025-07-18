// components/TrackForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import AddCheckpoints from "@/app/actions/AddCheckpoint";

type FormValues = {
  trackId: string;
  message: string;
};

export default function TrackPage({ pageUrl }: { pageUrl: string; }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    const trackingId = data.trackId.trim();

    if (pageUrl === "/duty/checkpoints") {
      await AddCheckpoints(data);
    }

    if (trackingId) {
      router.push(`${pageUrl}?trackId=${trackingId}`);
    }

    reset();
  };


  return (
    <section className="flex w-full sm:w-1/2 lg:w-1/3 min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-center fontgenos">{pageUrl === "/duty/checkpoints" ? "Add Checkpoints" : "Track Your Order Progress"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col mt-4 gap-4">
        <input
          type="text"
          placeholder="Enter tracking number"
          {...register("trackId", { required: "Tracking ID is required" })}
          className={`w-full p-2 border rounded ${errors.trackId ? "border-red-500" : "border-purple-900"}`}
        />
        {errors.trackId?.message && (
          <p className="text-red-500 text-sm">{errors.trackId.message}</p>
        )}
        {pageUrl === "/duty/checkpoints" &&
          <>
            <input
              type="text"
              placeholder="Enter tracking number"
              {...register("message")}
              className="w-full p-2 border rounded"
            />
          </>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-700 text-white font-bold py-2 rounded hover:bg-purple-800 transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
