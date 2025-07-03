import mongoose, { Document, Schema, Model } from "mongoose";

interface Branch {
  name: string;
  available: boolean;
  phone: string[];
  address: string;
}

export interface BranchDocument extends Document {
  division: string;
  branches: Branch[];
}

const branchSchema = new Schema<BranchDocument>({
  division: { type: String, required: true },
  branches: [
    {
      name: { type: String, required: true },
      available: { type: Boolean, default: true },
      phone: { type: [String], default: [] },
      address: { type: String, required: true },
    },
  ],
});

// ✅ Force Mongoose to use the exact "branchs" collection
const Branch: Model<BranchDocument> =
  mongoose.models.Branch || mongoose.model<BranchDocument>("Branch", branchSchema, "branchs");

export default Branch;
