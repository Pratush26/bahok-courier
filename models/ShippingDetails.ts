import mongoose, { Schema, Document, Model } from "mongoose";

interface IProduct {
  productType: string;
  desc: string;
  weight: string;
  amount?: string;
}

interface IOrder {
  orderId?: string;
  due?: string;
  charge: number;
  estimatedTime: Date;
  distanceType: string;
  approvedBy: string;
}

interface ICheckPoint {
  ReceivingTime?: Date;
  place?: string;
  message?: string;
  secretNote?: string;
  status?: boolean;
  receivedBy?: string;
}

export interface IShippingDetails extends Document {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  senderCity: string;
  senderCountry?: string;

  receiverName: string;
  receiverEmail?: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverCity: string;
  receiverCountry?: string;

  product: IProduct[];
  order: IOrder;
  checkPoints: ICheckPoint[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  productType: { type: String, required: true, minlength: 4, maxlength: 40 },
  desc: { type: String, required: true, minlength: 3, maxlength: 50 },
  weight: { type: String, required: true },
  amount: { type: String, required: false },
});

const OrderSchema = new Schema<IOrder>({
  orderId: { type: String, required: false, minlength: 5, maxlength: 18 },
  due: { type: String, required: false },
  charge: { type: Number, required: true, min: 1 },
  estimatedTime: { type: Date, required: true },
  distanceType: {type: String, required: true},
  approvedBy: { type: String, required: true },
});

const CheckPointSchema = new Schema<ICheckPoint>({
  ReceivingTime: { type: Date, required: false },
  place: { type: String, required: false, minlength: 3 },
  message: { type: String, required: false, minlength: 3, maxlength: 130 },
  secretNote: { type: String, required: false, minlength: 3, maxlength: 120 },
  status: { type: Boolean, default: false, required: false },
  receivedBy: { type: String, required: false },
});

const ShippingDetailsSchema = new Schema<IShippingDetails>({
  senderName: { type: String, required: true, minlength: 3 },
  senderEmail: { type: String, required: true },
  senderPhone: { type: String, required: true },
  senderAddress: { type: String, required: true, minlength: 5 },
  senderCity: { type: String, required: true, minlength: 3 },
  senderCountry: { type: String, required: false, minlength: 3 },

  receiverName: { type: String, required: true, minlength: 3 },
  receiverEmail: { type: String, required: false },
  receiverPhone: { type: String, required: true },
  receiverAddress: { type: String, required: true, minlength: 5 },
  receiverCity: { type: String, required: true, minlength: 3 },
  receiverCountry: { type: String, required: false, minlength: 3 },

  product: { type: [ProductSchema], required: true },
  order: { type: OrderSchema, required: true },
  checkPoints: { type: [CheckPointSchema], required: false },
}, { timestamps: true });

const ShippingDetailsModel: Model<IShippingDetails> =
  mongoose.models.ShippingDetails || mongoose.model<IShippingDetails>("ShippingDetails", ShippingDetailsSchema);

export default ShippingDetailsModel;

