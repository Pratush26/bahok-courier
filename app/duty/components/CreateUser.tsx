"use client";

import { createUser } from "@/app/actions/CreateUser";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import Select, { StylesConfig, GroupBase } from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/schemas/userSchema";
import { useEffect, useState } from "react";

type User = z.infer<typeof userSchema> & {
};
type BranchDetails = {
    division: string;
    name: string;
    available: boolean;
    phone: string[];
    address: string;
};

type OptionType = {
    label: string;
    value: string;
};

// Style config typed properly
const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: 'white',
        borderColor: '#D5A5FD',
        boxShadow: state.isFocused ? '0 0 0 0.1px #D5A5FD' : 'none',
        '&:hover': {
            borderColor: '#6b21a8',
        },
        borderRadius: '1rem',
        padding: '0.1rem',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? '#6b21a8'
            : state.isFocused
                ? '#ede9fe'
                : 'white',
    }),
};

export default function RegisterForm({ branchList }: { branchList: BranchDetails[] }) {

    const [mount, SetMount] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    useEffect(() => {
        SetMount(true);
    }, []);
    const placeOptions: OptionType[] = branchList.map((b) => ({
        value: `${b.name}, ${b.division}`,
        label: `${b.name}, ${b.division}`,
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
      setMessage({ type: "error", text: result.message || "Something went wrong." });
      return;
    }

    setMessage({ type: "success", text: result.message || "User created successfully." });
    reset();
  };
    if (!mount) return null;
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-6 w-full md:w-11/12">
            {message && (
        <p
          className={`text-sm font-medium w-full text-center px-4 py-2 rounded-xl ${
            message.type === "success" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
          }`}
        >
          {message.text}
        </p>
      )}
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
                    <input {...register("password")} type="password" placeholder="Enter password" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.password && <p className="text-pink-700 text-sm">{errors.password.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("confirmPassword")} type="password" placeholder="Retype password" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.confirmPassword && <p className="text-pink-700 text-sm">{errors.confirmPassword.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <label className="block mb-2 font-semibold">Select Role:</label>
                    <div className="flex flex-wrap gap-6">
                        <label className="cursor-pointer">
                            <input
                                {...register("role", { required: true })}
                                type="radio"
                                value="manager"
                                className="mr-2"
                            />
                            Manager
                        </label>
                        <label className="cursor-pointer">
                            <input
                                {...register("role", { required: true })}
                                type="radio"
                                value="admin"
                                className="mr-2"
                            />
                            Admin
                        </label>
                        <label className="cursor-pointer">
                            <input
                                {...register("role", { required: true })}
                                type="radio"
                                value="editor"
                                className="mr-2"
                            />
                            Editor
                        </label>
                        <label className="cursor-pointer">
                            <input
                                {...register("role", { required: true })}
                                type="radio"
                                value="employee"
                                className="mr-2"
                            />
                            Employee
                        </label>
                    </div>
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
                                    className="w-3/4 text-black"
                                    styles={customStyles}
                                    value={selectedOption || null}
                                    onChange={(val) => field.onChange(val?.value || "")}
                                />

                                {selectedOption && (
                                    <div className="text-sm sm:col-span-2 lg:col-span-1">
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
