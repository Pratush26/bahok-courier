// models/distanceType.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface distanceType extends Document {
  type: string;
  value: number;
  article: string;
}

const distanceTypeSchema = new Schema<distanceType>({
  type: { type: String, required: true },
  value: { type: Number, required: true },
  article: { type: String, required: true },
});

// Avoid recompilation errors on hot reload (Next.js dev)
const distanceType: Model<distanceType> = mongoose.models.distanceType || mongoose.model<distanceType>("distanceType", distanceTypeSchema);

export default distanceType;
