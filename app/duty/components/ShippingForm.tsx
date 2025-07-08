"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import Select, { StylesConfig, GroupBase } from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingDetailsSchema } from "@/schemas/ShippingSchema";
import { z } from "zod";
import { createShipping } from "@/app/actions/ShippingDetails";

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
    price: number | null,
};
type distanceType = {
    type: string;
    value: number;
}

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

export default function ShippingForm({ branchList, ProductType, distanceType }: { branchList: BranchDetails[]; ProductType: distanceType[]; distanceType: distanceType[] }) {

    const [mount, SetMount] = useState(false)
    useEffect(() => {
        SetMount(true);
    }, []);
    const { data: session } = useSession()
    const appover = session?.user.email
    const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
    const [trackingId, setTrackingId] = useState<string | null>(null);

    const [productTypeValue, setProductTypeValue] = useState<number | null>(null);
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
        price: null,
    }));
    const productTypeOptions: OptionType[] = ProductType.map((b) => ({
        value: b.type,
        label: b.type,
        price: b.value,
    }));

    // Extract the watched values first:
    const sender = watch("senderCity");
    const receiver = watch("recieverCity");

    const distance = useMemo(() => {
        if (!sender || !receiver) return null;

        const [senderCity, senderDivision] = sender.split(", ").map(s => s.trim());
        const [receiverCity, receiverDivision] = receiver.split(", ").map(s => s.trim());

        if (senderDivision === receiverDivision) {
            if (senderCity === receiverCity) return "IntraLocal";
            else if (senderDivision === senderCity || senderDivision === receiverCity) return "Local";
            return "IntraDivision";
        } else if (senderDivision === "Dhaka" || receiverDivision === "Dhaka") {
            if (senderDivision === senderCity && receiverDivision === receiverCity) return "Capital";
            return "Remote";
        } else {
            if (senderDivision === senderCity && receiverDivision === receiverCity) return "Divisional";
            else if (senderDivision === senderCity || receiverDivision === receiverCity) return "InterDivision";
            return "CrossCapital";
        }
    }, [sender, receiver]);

    // ✅ useEffect to set required fields not present in UI
    useEffect(() => {
        if (appover) setValue("order.approvedBy", appover);
        if (distance) {
            setValue("order.distanceType", distance);
        } else if (interNational) {
            setValue("order.distanceType", "Overseas");
        }
        if (productTypeValue) console.log("productTypeValue", productTypeValue)
        if (estimatedPrice !== null) {
            setValue("order.charge", estimatedPrice);
        }

        setValue("order.estimatedTime", new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
        setValue("checkPoints", []);

    }, [appover, estimatedPrice, setValue, distance, productTypeValue, interNational]);

    const distanceValue = useMemo(() => {
        return distanceType.find(d => d.type === distance)?.value;
    }, [distance, distanceType]); // ✅ Correct dependencies

    const handleCheckPrice = () => {
        const weightStr = watch("product.0.weight");
        const weight = parseFloat(weightStr);

        if (!isNaN(weight) && weight > 0 && productTypeValue && distanceValue) {
            const price = (weight * productTypeValue + 30) * distanceValue;
            setEstimatedPrice(price);
        } else {
            setEstimatedPrice(null);
            alert("Please enter a valid product weight");
        }
    };

    const onSubmit = async (data: ShippingDetails) => {
        try {
            const result = await createShipping(data);
            if (result.success) {
                setTrackingId(result.trackingId ?? null); // 👈 Save the ID
                reset();
            }
        } catch (err: unknown) {
            console.error("the error is", err)
        }
    };

    if (!mount) return null;
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 w-full">
            {trackingId && (
                <div className="mt-4 bg-purple-100 p-4 rounded-xl text-purple-900 w-full max-w-md text-center">
                    <p className="mb-2 font-semibold">✅ Shipping created!</p>
                    <p className="break-all">
                        Tracking ID: <span className="font-mono">{trackingId}</span>
                    </p>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(trackingId);
                            alert("Copied to clipboard!");
                        }}
                        className="mt-2 text-sm bg-purple-800 text-white px-3 py-1 rounded hover:bg-purple-900"
                    >
                        Copy Tracking ID
                    </button>
                </div>
            )}
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
                                    onChange={(val) => {
                                        field.onChange(val?.value || "");
                                        setProductTypeValue(val?.price ?? null); // ⬅️ update price state here
                                    }}
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
                    // disabled={isSubmitting || estimatedPrice === null}
                    className="disabled:bg-gray-700 bg-purple-900 px-4 py-2 rounded-xl hover:bg-purple-950 hover:scale-105 hover:shadow-lg/80 shadow-purple-950 cursor-pointer transition-discrete transition-all duration-300"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>

            </section>
        </form>
    );
}
