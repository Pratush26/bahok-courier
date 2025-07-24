// components/TrackForm.tsx
"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AddCheckpoint, UpdateCheckpoint } from "@/app/actions/AddCheckpoint";

type FormValues = {
  trackId: string;
  message?: string;
  secretNote?: string;
};

export default function TrackPage({ pageUrl }: { pageUrl: string; }) {

  const [monunt, setMonunt] = useState(false)
  const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const router = useRouter();
  const [scannerStarted, setScannerStarted] = useState(false);
  const handleForm = async (
  data: FormValues,
  event?: React.BaseSyntheticEvent
) => {
  if (!event) return;

  // Cast nativeEvent to SubmitEvent to access submitter
  const submitEvent = event.nativeEvent as unknown as SubmitEvent;
  const button = submitEvent.submitter as HTMLButtonElement | null;

  if (pageUrl === "/duty/checkpoints") {
    if (button?.name === "update") {
      await UpdateCheckpoint(data);
    } else {
      await AddCheckpoint(data);
    }
  }

  if (data.trackId) {
    router.push(`${pageUrl}?trackId=${data.trackId}#order-details`);
  }

  reset();
};
  useEffect(() => {
  if (scannerStarted) {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    }, false); // 👈 FIXED: verbose added

    scanner.render(
      (decodedText) => {
        setValue("trackId", decodedText); // set input
        scanner.clear();
        setScannerStarted(false); // stop scanner
      },
      (error: unknown) => {
        console.warn("QR scan error", error);
      }
    );

    return () => {
      scanner.clear().catch((err: unknown) => console.error("Clear error", err));
    };
  }
}, [scannerStarted, setValue]);

  useEffect(() => {
    setMonunt(true);
  }, []);
  if (!monunt) return null;
  return (
    <section className="flex w-full sm:w-1/2 lg:w-1/3 min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-center fontgenos">{pageUrl === "/duty/checkpoints" ? "Add Checkpoints" : "Track Your Order Progress"}</h1>
      <form onSubmit={handleSubmit((data, event) => handleForm(data, event))} className="w-full flex flex-col mt-4 gap-4">
          <div id="reader" className="w-full" />
        <input
          type="text"
          placeholder="Enter tracking number"
          {...register("trackId", { required: "Tracking ID is required" })}
          className={`w-full p-2 border rounded ${errors.trackId ? "border-red-500" : "border-purple-900"}`}
        />
          <button
            type="button"
            className="bg-gray-700 text-white p-2 rounded cursor-pointer"
            onClick={() => setScannerStarted(true)}
          >
            Scan QR
          </button>
        {errors.trackId?.message && (
          <p className="text-red-500 text-sm">{errors.trackId.message}</p>
        )}
        {pageUrl === "/duty/checkpoints" &&
          <>
            <input
              type="text"
              placeholder="Enter User message"
              {...register("message")}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Enter secret message"
              {...register("secretNote")}
              className="w-full p-2 border rounded"
            />
          </>}
        <section className="flex gap-4">
          {pageUrl === "/duty/checkpoints" &&
            <button
              type="submit"
              name="update"
              disabled={isSubmitting}
              className="w-1/2 bg-purple-700 text-white font-bold py-2 rounded hover:bg-purple-800 transition-colors duration-300"
            >
              Update
            </button>
          }
          <button
            type="submit"
            name="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-purple-700 text-white font-bold py-2 rounded hover:bg-purple-800 transition-colors duration-300"
          >
            Submit
          </button>
        </section>
      </form>
    </section>
  );
}
