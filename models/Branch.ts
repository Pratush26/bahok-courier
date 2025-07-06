// models/Branch.ts
import mongoose, { Document, Schema, Model } from "mongoose";

export interface BranchDocument extends Document {
  division: string;
  name: string;
  available: boolean;
  phone: string[];
  address: string;
}

const branchSchema = new Schema<BranchDocument>({
  division: { type: String, required: true },
  name: { type: String, required: true },
  available: { type: Boolean, default: true },
  phone: { type: [String], default: [] },
  address: { type: String, required: true },
});

// ✅ Enforce custom collection name "branches"
const Branch: Model<BranchDocument> =
  mongoose.models.Branch || mongoose.model<BranchDocument>("Branch", branchSchema, "branchs");

export default Branch;
