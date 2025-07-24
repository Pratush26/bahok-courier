"use server";

import connectDB from "@/lib/dbConnect";
import Branch from "@/models/Branch";
import { z } from "zod";
import { branchSchema } from "@/schemas/BranchSchema";

type BranchInput = z.infer<typeof branchSchema>;

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
    }catch (error: unknown) {
        console.error("Database connection error:", error);
        return { success: false, message: "Database connection failed." };
    }
}