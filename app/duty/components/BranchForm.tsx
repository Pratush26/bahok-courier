"use client";

import { createBranch } from "@/app/actions/CreateBranch";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import Select, { StylesConfig, GroupBase } from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { branchSchema } from "@/schemas/BranchSchema";
import { useEffect, useState } from "react";

type Branch = z.infer<typeof branchSchema> & {
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

const DivisionList: OptionType[] = [
    { value: "Dhaka", label: "Dhaka" },
    { value: "Chattogram", label: "Chattogram" },
    { value: "Rajshahi", label: "Rajshahi" },
    { value: "Khulna", label: "Khulna" },
    { value: "Barishal", label: "Barishal" },
    { value: "Sylhet", label: "Sylhet" },
    { value: "Rangpur", label: "Rangpur" },
    { value: "Mymensingh", label: "Mymensingh" }
];
export default function BranchForm() {

    const [mount, SetMount] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [isAvailable, setIsAvailable] = useState(true)
    useEffect(() => {
        SetMount(true);
    }, []);

    const defaultValues = isAvailable
        ? {
            phone: [{ number: "" }],
        }
        : { // or any fallback you want when not available
        };

    const {
        register,
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Branch>({
        resolver: zodResolver(branchSchema),
        defaultValues,
    });

    useEffect(() => {
        setValue("available", true);
    }, [setValue]);
    useEffect(() => {
        setValue("available", isAvailable);
    }, [isAvailable, setValue]);

    const placeOptions: OptionType[] = DivisionList.map((b) => ({
        value: b.value,
        label: b.label,
    }));

    const {
        fields: phoneFields,
        append: appendPhone,
        remove: removePhone,
    } = useFieldArray({
        control,
        name: "phone",
    });
    const onSubmit = async (data: Branch) => {
        const result = await createBranch(data);
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
                    className={`text-sm font-medium w-full text-center px-4 py-2 rounded-xl ${message.type === "success" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                        }`}
                >
                    {message.text}
                </p>
            )}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-center justify-items-center">
                <span className="flex flex-col w-full">
                    <input {...register("name")} placeholder="Enter Branch Name" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.name && <p className="text-pink-700 text-sm">{errors.name.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <Controller
                        name="division"
                        control={control}
                        rules={{ required: "Please select one place" }}
                        render={({ field }) => {
                            const selectedOption = placeOptions.find((opt) => opt.value === field.value);
                            return (
                                <>
                                    <Select
                                        options={placeOptions}
                                        isClearable
                                        placeholder="Select branch division"
                                        className="w-full text-black"
                                        styles={customStyles}
                                        value={selectedOption || null}
                                        onChange={(val) => field.onChange(val?.value || "")}
                                    />

                                    {errors.division && (
                                        <p className="text-pink-700 text-sm">{errors.division.message}</p>
                                    )}
                                </>
                            );
                        }}
                    />
                </span>

                <span className="flex gap-4 items-center justify-center w-full">
                    <label className="block mb-2 font-semibold">Available:</label>
                    <button
                        type="button"
                        onClick={() => setIsAvailable(true)}
                        className={`px-6 py-2 font-semibold rounded hover:shadow-lg/50 transition-shadow duration-300 shadow-purple-900 ${isAvailable ? "bg-purple-900 underline text-white scale-110" : "bg-gray-300 text-black"}`}
                    >true</button>
                    <button
                        type="button"
                        onClick={() => setIsAvailable(false)}
                        className={`px-6 py-2 font-semibold rounded hover:shadow-lg/50 transition-shadow duration-300 shadow-purple-900 ${!isAvailable ? "bg-purple-900 underline text-white scale-110" : "bg-gray-300 text-black"}`}
                    >false</button>
                </span>

                <span className="flex flex-col w-full">
                    <textarea {...register("address")} placeholder="Enter Address" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.address && <p className="text-pink-700 text-sm">{errors.address.message}</p>}
                </span>

                {phoneFields.map((field, index) => (
                    <span key={field.id} className="flex w-full items-center justify-between gap-4">
                        <input
                            {...register(`phone.${index}.number` as const)}
                            type="tel"
                            placeholder="Enter Phone number"
                            className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full"
                        />
                        {errors.phone?.[index]?.number?.message && (
                            <p className="text-pink-700 text-sm">
                                {errors.phone[index].number?.message}
                            </p>
                        )}
                        <button
                            type="button"
                            onClick={() => removePhone(index)}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                            Remove
                        </button>
                    </span>
                ))}
                <button
                    type="button"
                    onClick={() => appendPhone({ number: "" })}
                    className="underline hover:text-purple-900 font-semibold cursor-pointer"
                >
                    + Add Phone
                </button>
            </section>
            <button type="submit"
                disabled={isSubmitting}
                className="bg-purple-900 px-4 py-2 rounded-xl text-white font-bold hover:bg-purple-950 hover:scale-105 hover:shadow-lg/80 shadow-purple-950 cursor-pointer transition-discrete transition-all duration-300">
                {isSubmitting ? "Registering..." : "Register"}
            </button>
        </form>
    );
}
