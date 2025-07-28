"use server";

import connectDB from "@/lib/dbConnect";
import Branch from "@/models/Branch";
import { z } from "zod";
import { branchSchema } from "@/schemas/BranchSchema";

type BranchInput = z.infer<typeof branchSchema> & {
    _id?: string; // Optional for updates
};

export async function createBranch(formData: BranchInput) {
    try {
        await connectDB();
        const data = branchSchema.parse(formData);

        const existingBranch = await Branch.findOne({ name: data.name });
        if (existingBranch) {
            return { success: false, message: "Branch with this name already exists" };
        }
        await Branch.create({
            division: data.division,
            name: data.name,
            available: data.available,
            phone: data.phone.map(phone => phone.number),
            address: data.address,
        });
        return { success: true, message: "Branch created successfully" };
    } catch (error: unknown) {
        console.error("Database connection error:", error);
        return { success: false, message: "Database connection failed." };
    }
}

export async function updateBranchData(formData: BranchInput) {
    try {
        await connectDB();
        const { _id, division, name, available, phone, address } = formData;
        console.log("Updating formdata of user branch with data:", formData);
        const dbBranch = await Branch.findOne({ _id: _id });
        if (!dbBranch) {
            return { success: false, message: "Branch not found!" };
        }
        if (dbBranch.division !== division) dbBranch.division = division;
        if (dbBranch.name !== name) dbBranch.name = name;
        if (dbBranch.available !== available) dbBranch.available = available === true ? true : false;
        if (dbBranch.phone.map(phone => phone) !== phone.map(phone => phone.number)) dbBranch.phone = phone.map(phone => phone.number);
        if (dbBranch.address !== address) dbBranch.address = address;
        await dbBranch.save();
        return { success: true, message: "Branch created successfully" };
    } catch (error: unknown) {
        console.error("Database connection error:", error);
        return { success: false, message: "Database connection failed." };
    }
}