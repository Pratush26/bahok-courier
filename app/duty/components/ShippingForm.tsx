"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingDetailsSchema } from "@/schemas/ShippingSchema";
import { z } from "zod";

type ShippingDetails = z.infer<typeof shippingDetailsSchema>;
type BranchDetails = {
    division: string;
    name: string;
    available: boolean;
    phone: string[];
    address: string;
};
type OptionType = {
    value: string;
    label: string;
};
type ProductTypeList = {
    name: string;
    value: number;
}

const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: 'white',
        borderColor: '#D5A5FD',
        boxShadow: state.isFocused ? '0 0 0 0.1px #D5A5FD' : 'none',
        '&:hover': {
            borderColor: '#6b21a8',
        },
        borderRadius: '1rem', // rounded-2xl
        padding: '0.1rem',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#6b21a8' : state.isFocused ? '#ede9fe' : 'white',
    }),
};

export default function ShippingForm({ branchList, ProductTypeList, }: { branchList: BranchDetails[]; ProductTypeList: ProductTypeList[]; }) {

    const [mount, SetMount] = useState(false)
    useEffect(() => {
        SetMount(true);
    }, []);
    const { data: session } = useSession()
    let appover = session?.user.email
    const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
    const [interNational, setInterNational] = useState(false)
    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
        setValue
    } = useForm<ShippingDetails>({
        resolver: zodResolver(shippingDetailsSchema),
    });
    const placeOptions: OptionType[] = branchList.map((b) => ({
        value: `${b.name}, ${b.division}`,
        label: `${b.name}, ${b.division}`,
    }));
    const productTypeOptions: OptionType[] = ProductTypeList.map((b) => ({
        value: b.name,
        label: b.name,
    }));
    const ptyps = watch("product.0.productType")
    console.log(ptyps)
    const distance = useMemo(() => {
        const sender = watch("senderCity");
        const receiver = watch("recieverCity");

        if (!sender || !receiver) return null;
        const [senderCity, senderDivision] = sender.split(", ").map(s => s.trim());
        const [recieverCity, recieverDivision] = receiver.split(", ").map(s => s.trim());

        if (senderDivision === recieverDivision) {
            if (senderCity === recieverCity) return 0.5;
            else if (senderDivision === senderCity || senderDivision === recieverCity) return 1;
            return 1.3;
        } else if (senderDivision === 'Dhaka' || recieverDivision === 'Dhaka') {
            if (senderDivision === senderCity && recieverDivision === recieverCity) return 1.7;
            return 2;
        } else {
            if (senderDivision === senderCity && recieverDivision === recieverCity) return 2.3;
            else if (senderDivision === senderCity || recieverDivision === recieverCity) return 2.4;
            return 2.5;
        }
    }, [watch("senderCity"), watch("recieverCity")]);

    // ✅ useEffect to set required fields not present in UI
    useEffect(() => {
        if (appover) setValue("order.approvedBy", appover);
        if (distance) {
            console.log('distance', distance)
            setValue("order.distanceType", distance)
        }

        if (estimatedPrice !== null) {
            setValue("order.charge", estimatedPrice);
        }

        setValue("order.estimatedTime", new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));

    }, [appover, estimatedPrice, setValue, distance]);



    const onSubmit = (data: ShippingDetails) => {
        console.log("Form Data:", data);
        reset();
        // Send to backend API here
    };

    const handleCheckPrice = () => {
        const weightStr = watch("product")?.[0]?.weight ?? "";
        const weight = parseFloat(weightStr);

        if (!isNaN(weight) && weight > 0) {
            const ratePerKg = 100; // Change as needed
            const price = weight * ratePerKg;
            setEstimatedPrice(price);
        } else {
            setEstimatedPrice(null);
            alert("Please enter a valid product weight");
        }
    };
    if (!mount) return null;
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 w-full">
            <div className="flex justify-evenly items-center w-full sm:w-1/2 lg:w-1/4">
                <button type="button" onClick={() => { setInterNational(false) }} className={`${!interNational && 'underline'}`}>National</button>
                <button type="button" onClick={() => { setInterNational(true) }} className={`${interNational && 'underline'}`}>International</button>
            </div>
            <fieldset className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-center justify-items-center">
            <legend className="my-2 text-xl font-semibold">Sender Information</legend>
                <span className="flex flex-col w-full">
                    <input {...register("senderName")} placeholder="Sender Name" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.senderName && <p className="text-pink-700 text-sm">{errors.senderName.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("senderEmail")} placeholder="Sender Email" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.senderEmail && <p className="text-pink-700 text-sm">{errors.senderEmail.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("senderPhone")} type="tel" placeholder="Sender Phone" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.senderPhone && <p className="text-pink-700 text-sm">{errors.senderPhone.message}</p>}
                </span>
                {interNational ?
                    <>
                        <span className="flex flex-col w-full">
                            <input {...register("senderCountry")} placeholder="Sender Country" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                            {errors.senderCountry && <p className="text-pink-700 text-sm">{errors.senderCountry.message}</p>}
                        </span>

                        <span className="flex flex-col w-full">
                            <input {...register("senderCity")} placeholder="Sender City" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                            {errors.senderCity && <p className="text-pink-700 text-sm">{errors.senderCity.message}</p>}
                        </span>
                    </>
                    :
                    <Controller
                        name="senderCity"
                        control={control}
                        rules={{ required: "Please select one place" }}
                        render={({ field }) => {
                            const selectedOption = placeOptions.find((opt) => opt.value === field.value);
                            return (
                                <span className="flex flex-col w-full">
                                    <Select
                                        options={placeOptions}
                                        isClearable
                                        placeholder="Sender City"
                                        className="w-3/4 text-black"
                                        styles={customStyles}
                                        value={selectedOption || null}
                                        onChange={(val) => field.onChange(val?.value || "")}
                                    />
                                    {errors.senderCity && <p className="text-pink-700 text-sm">{errors.senderCity.message}</p>}
                                </span>
                            );
                        }}
                    />
                }

                <span className="flex flex-col w-full">
                    <textarea {...register("senderAddress")} placeholder="Sender Address" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.senderAddress && <p className="text-pink-700 text-sm">{errors.senderAddress.message}</p>}
                </span>
            </fieldset>

            <fieldset className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-center justify-items-center">
            <legend className="my-2 text-xl font-semibold">Receiver Information</legend>
                <span className="flex flex-col w-full">
                    <input {...register("recieverName")} placeholder="Receiver Name" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.recieverName && <p className="text-pink-700 text-sm">{errors.recieverName.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("recieverEmail")} placeholder="Receiver Email" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.recieverEmail && <p className="text-pink-700 text-sm">{errors.recieverEmail.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("recieverPhone")} type="tel" placeholder="Receiver Phone" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.recieverPhone && <p className="text-pink-700 text-sm">{errors.recieverPhone.message}</p>}
                </span>

                {interNational ?
                    <>
                        <span className="flex flex-col w-full">
                            <input {...register("recieverCountry")} placeholder="reciever Country" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                            {errors.recieverCountry && <p className="text-pink-700 text-sm">{errors.recieverCountry.message}</p>}
                        </span>

                        <span className="flex flex-col w-full">
                            <input {...register("recieverCity")} placeholder="reciever City" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                            {errors.recieverCity && <p className="text-pink-700 text-sm">{errors.recieverCity.message}</p>}
                        </span>
                    </>
                    :
                    <Controller
                        name="recieverCity"
                        control={control}
                        rules={{ required: "Please select one place" }}
                        render={({ field }) => {
                            const selectedOption = placeOptions.find((opt) => opt.value === field.value);
                            return (
                                <span className="flex flex-col w-full">
                                    <Select
                                        options={placeOptions}
                                        isClearable
                                        placeholder="Reciever City"
                                        className="w-3/4 text-black"
                                        styles={customStyles}
                                        value={selectedOption || null}
                                        onChange={(val) => field.onChange(val?.value || "")}
                                    />
                                    {errors.recieverCity && <p className="text-pink-700 text-sm">{errors.recieverCity.message}</p>}
                                </span>
                            );
                        }}
                    />
                }

                <span className="flex flex-col w-full">
                    <textarea {...register("recieverAddress")} placeholder="Receiver Address" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.recieverAddress && <p className="text-pink-700 text-sm">{errors.recieverAddress.message}</p>}
                </span>
            </fieldset>

            <fieldset className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-center justify-items-center">
            <legend className="my-2 text-xl font-semibold">Product Information</legend>
                <Controller
                    name="product.0.productType"
                    control={control}
                    rules={{ required: "Please select one place" }}
                    render={({ field }) => {
                        const selectedOption = productTypeOptions.find((opt) => opt.value === field.value);
                        return (
                            <span className="flex flex-col w-full">
                                <Select
                                    options={productTypeOptions}
                                    isClearable
                                    placeholder="Define Product type"
                                    className="w-3/4 text-black"
                                    styles={customStyles}
                                    value={selectedOption || null}
                                    onChange={(val) => field.onChange(val?.value || "")}
                                />
                                {errors.product?.[0]?.productType && <p className='text-pink-700 text-sm'>{errors.product?.[0]?.productType.message}</p>}
                            </span>
                        );
                    }}
                />

                <span className="flex flex-col w-full">
                    <input {...register("product.0.weight")} placeholder="Enter product's Weight in kg" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.product?.[0]?.weight && <p className='text-pink-700 text-sm'>{errors.product?.[0]?.weight.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("product.0.amount")} placeholder="Enter quantity" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.product?.[0]?.amount && <p className='text-pink-700 text-sm'>{errors.product?.[0]?.amount.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("order.due")} placeholder="Enter due amount" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.order?.due && <p className='text-pink-700 text-sm'>{errors.order?.due.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <textarea {...register("product.0.desc")} placeholder="Enter your product description" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.product?.[0]?.desc && <p className='text-pink-700 text-sm'>{errors.product?.[0]?.desc.message}</p>}
                </span>

            </fieldset>



            <section className="flex justify-center items-center gap-4 flex-wrap text-white font-bold">
                {estimatedPrice === null ? (
                    <p className="text-sm text-pink-600">You must check the price before submitting.</p>
                ) : (
                    <p className="text-green-600 font-semibold">
                        Estimated Price: ৳{estimatedPrice.toFixed(2)}
                    </p>
                )}
                <button
                    type="button"
                    onClick={handleCheckPrice}
                    className="bg-gray-800 px-4 py-2 rounded-xl hover:bg-gray-900 hover:scale-105 hover:shadow-lg/80 shadow-purple-950 cursor-pointer transition-discrete transition-all duration-300"
                >
                    Check Price
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting || estimatedPrice === null}
                    className="bg-purple-900 px-4 py-2 rounded-xl hover:bg-purple-950 hover:scale-105 hover:shadow-lg/80 shadow-purple-950 cursor-pointer transition-discrete transition-all duration-300"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>

            </section>
        </form>
    );
}
