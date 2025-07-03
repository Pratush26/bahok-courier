"use client";

import { createUser } from "@/app/actions/CreateUser";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import Select from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/schemas/userSchema";

type User = z.infer<typeof userSchema> & {
};

type OptionType = {
    value: string;
    label: string;
};

export default function RegisterForm({ branchList }: { branchList: { branch: string }[] }) {

    const placeOptions: OptionType[] = branchList.map((b) => ({
        value: b.branch,
        label: b.branch,
    }));

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<User>({
        resolver: zodResolver(userSchema),
    });

    const onSubmit = async (data: User) => {
        const result = await createUser(data);

        if (!result.success) {
            console.error("Error creating user:", result.message);
            return;
        }

        console.log("User created successfully");
        console.log("Form Data:", data);

        reset(); // Reset form after submission
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-6 w-full md:w-11/12">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-center justify-items-center">
                <span className="flex flex-col w-full">
                    <input {...register("name")} placeholder="Enter Name" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.name && <p className="text-pink-700 text-sm">{errors.name.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("email")} placeholder="Enter Email" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.email && <p className="text-pink-700 text-sm">{errors.email.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("phone")} type="tel" placeholder="Enter Phone number" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.phone && <p className="text-pink-700 text-sm">{errors.phone.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("nid")} placeholder="Enter NID number" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.nid && <p className="text-pink-700 text-sm">{errors.nid.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("password")} placeholder="Enter password" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.password && <p className="text-pink-700 text-sm">{errors.password.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("role")} placeholder="Enter role" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.role && <p className="text-pink-700 text-sm">{errors.role.message}</p>}
                </span>

                <Controller
                    name="dutyPlace"
                    control={control}
                    rules={{ required: "Please select one place" }}
                    render={({ field }) => {
                        const selectedOption = placeOptions.find((opt) => opt.value === field.value);
                        return (
                            <>
                                <Select
                                    options={placeOptions}
                                    isClearable
                                    placeholder="Select a place..."
                                    className="text-black w-3/4"
                                    value={selectedOption || null}
                                    onChange={(val) => field.onChange(val?.value || "")}
                                />
                                {selectedOption && (
                                    <div className="text-sm">
                                        Duty Place - <strong>{selectedOption.label}</strong>
                                    </div>
                                )}
                                {errors.dutyPlace && (
                                    <p className="text-pink-700 text-sm">{errors.dutyPlace.message}</p>
                                )}
                            </>
                        );
                    }}
                />
            </section>
            <button type="submit"
                disabled={isSubmitting}
                className="bg-purple-900 px-4 py-2 rounded-xl text-white font-bold hover:bg-purple-950 hover:scale-105 hover:shadow-lg/80 shadow-purple-950 cursor-pointer transition-discrete transition-all duration-300">
                {isSubmitting ? "Registering..." : "Register"}
            </button>
        </form>
    );
}
