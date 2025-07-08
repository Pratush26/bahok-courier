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
  RecievingTime?: Date;
  place?: string;
  message?: string;
  secretNote?: string;
  status?: boolean;
  recievedBy?: string;
}

export interface IShippingDetails extends Document {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  senderCity: string;
  senderCountry?: string;

  recieverName: string;
  recieverEmail?: string;
  recieverPhone: string;
  recieverAddress: string;
  recieverCity: string;
  recieverCountry?: string;

  product: IProduct[];
  order: IOrder;
  checkPoints: ICheckPoint[];
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
  RecievingTime: { type: Date, required: false },
  place: { type: String, required: false, minlength: 3 },
  message: { type: String, required: false, minlength: 3, maxlength: 30 },
  secretNote: { type: String, required: false, minlength: 3, maxlength: 20 },
  status: { type: Boolean, default: false, required: false },
  recievedBy: { type: String, required: false },
});

const ShippingDetailsSchema = new Schema<IShippingDetails>({
  senderName: { type: String, required: true, minlength: 3 },
  senderEmail: { type: String, required: true },
  senderPhone: { type: String, required: true },
  senderAddress: { type: String, required: true, minlength: 5 },
  senderCity: { type: String, required: true, minlength: 3 },
  senderCountry: { type: String, required: false, minlength: 3 },

  recieverName: { type: String, required: true, minlength: 3 },
  recieverEmail: { type: String, required: false },
  recieverPhone: { type: String, required: true },
  recieverAddress: { type: String, required: true, minlength: 5 },
  recieverCity: { type: String, required: true, minlength: 3 },
  recieverCountry: { type: String, required: false, minlength: 3 },

  product: { type: [ProductSchema], required: true },
  order: { type: OrderSchema, required: true },
  checkPoints: { type: [CheckPointSchema], required: false },
});

const ShippingDetailsModel: Model<IShippingDetails> =
  mongoose.models.ShippingDetails || mongoose.model<IShippingDetails>("ShippingDetails", ShippingDetailsSchema);

export default ShippingDetailsModel;

