'use client';

import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/signInSchma";

type User = z.infer<typeof signInSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const onSubmit = async (data: User) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      setError("Something went wrong"); // <-- This now works reliably
    } else {
      reset();
      router.push("/bahok");
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center mx-auto min-h-[80vh] gap-6 w-11/12 md:w-1/2 lg:w-1/3">
      {error && <p className="text-pink-700 text-sm">{error}</p>}
      <span className="flex flex-col w-full">
        <input {...register("email")} placeholder="Enter Email" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
        {errors.email && <p className="text-pink-700 text-sm">{errors.email.message}</p>}
      </span>
      <span className="flex flex-col w-full">
        <input {...register("password")} type="password" placeholder="Enter password" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
        {errors.password && <p className="text-pink-700 text-sm">{errors.password.message}</p>}
      </span>
      <button type="submit"
        disabled={isSubmitting}
        className="bg-purple-900 px-4 py-2 rounded-xl text-white font-bold hover:bg-purple-950 hover:scale-105 hover:shadow-lg/80 shadow-purple-950 cursor-pointer transition-discrete transition-all duration-300">
        {isSubmitting ? "Logging In..." : "Log In"}
      </button>
    </form>
  );
}