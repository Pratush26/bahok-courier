"use client";

import { useForm, Controller } from "react-hook-form";
import Select, { StylesConfig, GroupBase } from "react-select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function FindBranch({ branchName }: { branchName: { _id:string; name: string }[] }) {
    const [mount, setMount] = useState(false);
    const router = useRouter();
    const placeOptions: OptionType[] = branchName.map((b) => ({
        value: b._id,
        label: b.name,
    }));

    useEffect(() => {
        setMount(true);
    }, []);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<{ _id: string }>();

    const onSubmit = async (data: { _id: string }) => {
        // Optionally, you can validate or do something before redirecting
        const _id = encodeURIComponent(data._id);
        router.push(`/duty/protected/add-branch?_id=${_id}`);
        reset();
    };

    if (!mount) return null;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center gap-6 w-11/12 md:w-2/3 lg:w-1/2"
        >
            <Controller
                    name="_id"
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
                                {errors._id && (
                                    <p className="text-pink-700 text-sm">{errors._id.message}</p>
                                )}
                            </>
                        );
                    }}
                />
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
