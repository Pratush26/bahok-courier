"use client";

import { UpdatePassword } from "@/app/actions/CreateUser";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

type UserInput = {
  email: string;
  Oldpassword: string;
  password: string;
  confirmPassword: string;
};

export default function PasswordManager() {
  const { data: session } = useSession();
  const email = session?.user?.email || "";
  const [mount, setMount] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    setMount(true);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserInput>();

  const password = watch("password");

  useEffect(() => {
    setValue("email", email);
  }, [email, setValue]);

  const onSubmit = async (data: UserInput) => {
    setMessage(null); // clear old messages

    const result = await UpdatePassword(data);

    if (!result.success) {
      setMessage({ type: "error", text: result.message || "Something went wrong." });
      return;
    }

    setMessage({ type: "success", text: result.message || "Password updated successfully." });
    reset();
  };

  if (!mount) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-6 w-11/12 md:w-2/3 lg:w-1/3"
    >
      {message && (
        <p
          className={`text-sm font-medium w-full text-center px-4 py-2 rounded-xl ${
            message.type === "success" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
          }`}
        >
          {message.text}
        </p>
      )}

      <input type="hidden" {...register("email")} />

      {/* Old Password */}
      <span className="flex flex-col w-full">
        <input
          {...register("Oldpassword", { required: "Old password is required" })}
          type="password"
          placeholder="Enter old password"
          className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full"
        />
        {errors.Oldpassword && (
          <p className="text-pink-700 text-sm">{errors.Oldpassword.message}</p>
        )}
      </span>

      {/* New Password */}
      <span className="flex flex-col w-full">
        <input
          {...register("password", {
            required: "New password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
          type="password"
          placeholder="Enter new password"
          className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full"
        />
        {errors.password && (
          <p className="text-pink-700 text-sm">{errors.password.message}</p>
        )}
      </span>

      {/* Confirm Password */}
      <span className="flex flex-col w-full">
        <input
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
          type="password"
          placeholder="Retype new password"
          className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full"
        />
        {errors.confirmPassword && (
          <p className="text-pink-700 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </span>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-purple-900 px-4 py-2 rounded-xl text-white font-bold hover:bg-purple-950 hover:scale-105 hover:shadow-lg/80 shadow-purple-950 cursor-pointer transition-all duration-300"
      >
        {isSubmitting ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
