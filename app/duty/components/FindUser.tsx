"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FindUser() {
    const [mount, setMount] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMount(true);
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<{ email: string }>();

    const onSubmit = async (data: { email: string }) => {
        // Optionally, you can validate or do something before redirecting
        const email = encodeURIComponent(data.email);
        router.push(`/duty/protected/handle-user?email=${email}`);
        reset();
    };

    if (!mount) return null;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center gap-6 w-11/12 md:w-2/3 lg:w-1/2"
        >
            <span className="flex flex-col w-full">
                <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Enter Email"
                    className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full"
                />
                {errors.email && (
                    <p className="text-pink-700 text-sm">{errors.email.message}</p>
                )}
            </span>
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-900 px-4 py-2 rounded-xl text-white font-bold hover:bg-purple-950 hover:scale-105 hover:shadow-lg/80 shadow-purple-950 cursor-pointer transition-discrete transition-all duration-300"
            >
                {isSubmitting ? "Searching..." : "Search"}
            </button>
        </form>
    );
}
