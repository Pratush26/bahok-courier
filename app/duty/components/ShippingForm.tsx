"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect, useMemo } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
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
        defaultValues: {
            /** START WITH ONE EMPTY PRODUCT ROW */
            product: [
                { productType: "", desc: "", weight: "", amount: "" },
            ],
            /** you can prefill order + checkpoints here if you like */
            order: {
                approvedBy: "",
                estimatedTime: new Date(),          // dummy, replace later
                charge: 0,
                distanceType: "",
            },
            checkPoints: [],
        },
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

    const {
        fields: productFields,
        append: appendProduct,
        remove: removeProduct,
    } = useFieldArray({
        control,
        name: "product",
    });

    // Extract the watched values first:
    const sender = watch("senderCity");
    const receiver = watch("receiverCity");

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
        if (estimatedPrice !== null) {
            setValue("order.charge", estimatedPrice);
        }

        setValue("order.estimatedTime", new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
        setValue("checkPoints", []);

    }, [appover, estimatedPrice, setValue, distance, interNational]);

    const distanceValue = useMemo(() => {
        return distanceType.find((d) => d.type === distance)?.value;
    }, [distance, distanceType]);

    const handleCheckPrice = async () => {
        const products = watch("product");

        if (!products || products.length === 0) {
            alert("No product data available");
            setEstimatedPrice(null);
            return;
        }

        let total = 0;

        for (const p of products) {
            const weight = parseFloat(p.weight);
            const amount = parseFloat(p.amount || "1"); // Default to 1 if empty or invalid
            const productOption = productTypeOptions.find((opt) => opt.value === p.productType);
            const pricePerKg = productOption?.price ?? null;

            if (!p.productType || isNaN(weight) || weight <= 0 || !pricePerKg || isNaN(amount) || amount <= 0) {
                alert("Please ensure all products have valid weight, amount, and product type");
                setEstimatedPrice(null);
                return;
            }

            total += weight * pricePerKg * amount;
        }

        let FinalDistanceValue: number | null = null;

        if (interNational) {
            if (!overseasSender || !overseasReceiver) {
                alert("International sender/receiver location is missing.");
                return;
            }

            try {
                const senderCoords = await getCoordinates(overseasSender);
                const receiverCoords = await getCoordinates(overseasReceiver);

                if (!senderCoords || !receiverCoords) {
                    console.error("Missing coordinates");
                    alert("Could not find locations for international delivery.");
                    return;
                }

                const distanceKm = await getDistanceFromORS(senderCoords, receiverCoords);
                FinalDistanceValue = Math.round(distanceKm/100);
            } catch (error) {
                console.error("Failed to calculate international distance:", error);
                return;
            }
        } else {
            FinalDistanceValue = distanceValue ?? null;
        }

        if (!FinalDistanceValue || isNaN(FinalDistanceValue)) {
            alert("Please select a valid distance type");
            setEstimatedPrice(null);
            return;
        }
        console.log("distance value is offf cut", FinalDistanceValue)
        const estimated = Math.round((total + 30) * FinalDistanceValue);
        setEstimatedPrice(estimated);
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

    //international distance calculation

    const getCoordinates = async (location: string) => {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${process.env.NEXT_PUBLIC_GEOCODE_API_KEY}`
        );
        const data = await response.json();
        return data.results?.[0]?.geometry; // { lat, lng }
    };

    const getDistanceFromORS = async (
        start: { lat: number; lng: number },
        end: { lat: number; lng: number }
    ) => {
        const response = await fetch(
            "https://api.openrouteservice.org/v2/directions/driving-car",
            {
                method: "POST",
                headers: {
                    Authorization: process.env.NEXT_PUBLIC_ORS_API_KEY || "",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    coordinates: [
                        [start.lng, start.lat], // ORS expects [lng, lat]
                        [end.lng, end.lat],
                    ],
                }),
            }
        );

        const data = await response.json();
        const distanceMeters = data?.routes?.[0]?.summary?.distance;
        if (!distanceMeters) throw new Error("No distance found");

        return distanceMeters / 1000; // return in km
    };


    const [senderCity, senderCountry] = watch(["senderCity", "senderCountry"]);
    const [receiverCity, receiverCountry] = watch(["receiverCity", "receiverCountry"]);

    const { overseasSender, overseasReceiver } = useMemo(() => {
        const allFieldsFilled = senderCity && senderCountry && receiverCity && receiverCountry;
        if (!allFieldsFilled) return { overseasSender: null, overseasReceiver: null };

        const overseasSender = [senderCity, senderCountry].join(", ");
        const overseasReceiver = [receiverCity, receiverCountry].join(", ");

        console.log("Sender:", overseasSender, "Receiver:", overseasReceiver);

        return { overseasSender, overseasReceiver };
    }, [senderCity, senderCountry, receiverCity, receiverCountry]);



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
                    <input {...register("receiverName")} placeholder="Receiver Name" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.receiverName && <p className="text-pink-700 text-sm">{errors.receiverName.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("receiverEmail")} placeholder="Receiver Email" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.receiverEmail && <p className="text-pink-700 text-sm">{errors.receiverEmail.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("receiverPhone")} type="tel" placeholder="Receiver Phone" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.receiverPhone && <p className="text-pink-700 text-sm">{errors.receiverPhone.message}</p>}
                </span>

                {interNational ?
                    <>
                        <span className="flex flex-col w-full">
                            <input {...register("receiverCountry")} placeholder="receiver Country" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                            {errors.receiverCountry && <p className="text-pink-700 text-sm">{errors.receiverCountry.message}</p>}
                        </span>

                        <span className="flex flex-col w-full">
                            <input {...register("receiverCity")} placeholder="receiver City" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                            {errors.receiverCity && <p className="text-pink-700 text-sm">{errors.receiverCity.message}</p>}
                        </span>
                    </>
                    :
                    <Controller
                        name="receiverCity"
                        control={control}
                        rules={{ required: "Please select one place" }}
                        render={({ field }) => {
                            const selectedOption = placeOptions.find((opt) => opt.value === field.value);
                            return (
                                <span className="flex flex-col w-full">
                                    <Select
                                        options={placeOptions}
                                        isClearable
                                        placeholder="receiver City"
                                        className="w-3/4 text-black"
                                        styles={customStyles}
                                        value={selectedOption || null}
                                        onChange={(val) => field.onChange(val?.value || "")}
                                    />
                                    {errors.receiverCity && <p className="text-pink-700 text-sm">{errors.receiverCity.message}</p>}
                                </span>
                            );
                        }}
                    />
                }

                <span className="flex flex-col w-full">
                    <textarea {...register("receiverAddress")} placeholder="Receiver Address" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.receiverAddress && <p className="text-pink-700 text-sm">{errors.receiverAddress.message}</p>}
                </span>
            </fieldset>

            {productFields.map((pf, index) => (
                <fieldset
                    key={pf.id}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-start"
                >
                    <legend className="col-span-full my-2 text-xl font-semibold">
                        Product&nbsp;{index + 1}
                    </legend>

                    {/* productType with react-select */}
                    <Controller
                        name={`product.${index}.productType`}
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
                                        className="w-full text-black"
                                        styles={customStyles}
                                        value={selectedOption || null}
                                        onChange={(val) => {
                                            field.onChange(val?.value || "");
                                        }}
                                    />
                                    {errors.product?.[index]?.productType && <p className='text-pink-700 text-sm'>{errors.product[index]?.productType.message}</p>}
                                </span>
                            );
                        }}
                    />

                    {/* weight */}
                    <div className="flex flex-col w-full">
                        <input
                            {...register(`product.${index}.weight`)}
                            placeholder="Weight (kg)"
                            className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full"
                        />
                        {errors.product?.[index]?.weight && (
                            <p className="text-pink-700 text-sm">
                                {errors.product[index]?.weight?.message}
                            </p>
                        )}
                    </div>

                    {/* amount */}
                    <div className="flex flex-col w-full">
                        <input
                            {...register(`product.${index}.amount`)}
                            placeholder="Quantity"
                            className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full"
                        />
                        {errors.product?.[index]?.amount && (
                            <p className="text-pink-700 text-sm">
                                {errors.product[index]?.amount?.message}
                            </p>
                        )}
                    </div>

                    {/* description */}
                    <div className="flex flex-col w-full">
                        <textarea
                            {...register(`product.${index}.desc`)}
                            placeholder="Description"
                            className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full"
                        />
                        {errors.product?.[index]?.desc && (
                            <p className="text-pink-700 text-sm">
                                {errors.product[index]?.desc?.message}
                            </p>
                        )}
                    </div>

                    {/* remove btn */}
                    {productFields.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeProduct(index)}
                            className="text-pink-700 place-self-center"
                        >
                            ✕ Remove
                        </button>
                    )}
                </fieldset>
            ))}

            <button
                type="button"
                onClick={() =>
                    appendProduct({ productType: "", desc: "", weight: "", amount: "" })
                }
                className="text-purple-800 underline"
            >
                + Add another product
            </button>

            <span className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
                <input {...register("order.due")} placeholder="Enter due amount" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                {errors.order?.due && <p className='text-pink-700 text-sm'>{errors.order?.due.message}</p>}
            </span>



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
