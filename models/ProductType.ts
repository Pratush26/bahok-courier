// models/productType.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface productType extends Document {
  type: string;
  value: number;
  article: string;
}

const productTypeSchema = new Schema<productType>({
  type: { type: String, required: true },
  value: { type: Number, required: true },
  article: { type: String, required: true },
});

// Avoid recompilation errors on hot reload (Next.js dev)
const productType: Model<productType> = mongoose.models.productType || mongoose.model<productType>("productType", productTypeSchema);

export default productType;
