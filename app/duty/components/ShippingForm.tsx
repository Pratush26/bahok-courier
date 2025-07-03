"use client";

import React, { useState } from "react";
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingDetailsSchema } from "@/schemas/ShippingSchema";
import { z } from "zod";

type ShippingDetails = z.infer<typeof shippingDetailsSchema>;

export default function ShippingForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ShippingDetails>({
        resolver: zodResolver(shippingDetailsSchema),
    });

    const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

    const onSubmit = (data: ShippingDetails) => {
        console.log("Form Data:", data);
        // Send to backend API here
    };

    const handleCheckPrice = () => {
        const weightStr = watch("productweight");
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
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 w-full">

            <h2 className="text-xl font-semibold">Sender Information</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-center justify-items-center">
                <span className="flex flex-col w-full">
                    <input {...register("sendername")} placeholder="Sender Name" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.sendername && <p className="text-pink-700 text-sm">{errors.sendername.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("senderemail")} placeholder="Sender Email" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.senderemail && <p className="text-pink-700 text-sm">{errors.senderemail.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("senderphone")} type="tel" placeholder="Sender Phone" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.senderphone && <p className="text-pink-700 text-sm">{errors.senderphone.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("senderstate")} placeholder="Sender State" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.senderstate && <p className="text-pink-700 text-sm">{errors.senderstate.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("sendercity")} placeholder="Sender City" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.sendercity && <p className="text-pink-700 text-sm">{errors.sendercity.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("senderpostalCode")} placeholder="Sender Postal Code" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.senderpostalCode && <p className="text-pink-700 text-sm">{errors.senderpostalCode.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <textarea {...register("senderaddress")} placeholder="Sender Address" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.senderaddress && <p className="text-pink-700 text-sm">{errors.senderaddress.message}</p>}
                </span>
            </section>


            <h2 className="text-xl font-semibold">Product Information</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full items-center justify-items-center">
                <span className="flex flex-col w-full">
                    <textarea {...register("productdetails")} placeholder="Enter your product description" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.productdetails && <motion.p className='text-pink-700 text-sm'>{errors.productdetails.message}</motion.p>}
                </span>
                <span className="flex flex-col w-full">
                    <input {...register("productweight")} placeholder="Enter product's Weight in kg" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.productweight && <p className='text-pink-700 text-sm'>{errors.productweight.message}</p>}
                </span>
            </section>

            <h2 className="text-xl font-semibold">Receiver Information</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-center justify-items-center">
                <span className="flex flex-col w-full">
                    <input {...register("recievername")} placeholder="Receiver Name" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.recievername && <p className="text-pink-700 text-sm">{errors.recievername.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("recieveremail")} placeholder="Receiver Email" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.recieveremail && <p className="text-pink-700 text-sm">{errors.recieveremail.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("recieverphone")} type="tel" placeholder="Receiver Phone" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.recieverphone && <p className="text-pink-700 text-sm">{errors.recieverphone.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("recieverstate")} placeholder="Receiver State" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.recieverstate && <p className="text-pink-700 text-sm">{errors.recieverstate.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("recievercity")} placeholder="Receiver City" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.recievercity && <p className="text-pink-700 text-sm">{errors.recievercity.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <input {...register("recieverpostalCode")} placeholder="Receiver Postal Code" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.recieverpostalCode && <p className="text-pink-700 text-sm">{errors.recieverpostalCode.message}</p>}
                </span>

                <span className="flex flex-col w-full">
                    <textarea {...register("recieveraddress")} placeholder="Receiver Address" className="bg-white border border-purple-300 px-4 py-2 rounded-2xl w-full" />
                    {errors.recieveraddress && <p className="text-pink-700 text-sm">{errors.recieveraddress.message}</p>}
                </span>
            </section>


            <section className="flex justify-center items-center gap-4 flex-wrap text-white font-bold">
                {estimatedPrice !== null && (
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
                <button type="submit" className="bg-purple-900 px-4 py-2 rounded-xl hover:bg-purple-950 hover:scale-105 hover:shadow-lg/80 shadow-purple-950 cursor-pointer transition-discrete transition-all duration-300">
                    Submit
                </button>
            </section>
        </form>
    );
}
