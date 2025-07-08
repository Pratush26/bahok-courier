import ShippingForm from "../components/ShippingForm";
import connectDB from "@/lib/dbConnect";
import BranchModel from "@/models/Branch";
import DistanceType from "@/models/DistanceType";
import ProductType from "@/models/ProductType";

type BranchDetails = {
  division: string;
  name: string;
  available: boolean;
  phone: string[];
  address: string;
};

type distanceType = {
  type: string;
  value: number;
};

export default async function ShippingFormPage() {
  let branchList: BranchDetails[] = [];
  let distanceTypes: distanceType[] = [];
  let productTypes: distanceType[] = [];

  try {
    await connectDB();
    branchList = (await BranchModel.find({ available: true }).lean()).map((branch) => ({
      ...branch,
      _id: branch._id.toString(), // convert ObjectId to string

    }));
    distanceTypes = (await DistanceType.find().lean()).map((p) => ({
  ...p,
  _id: p._id.toString(),
}));
    productTypes = (await ProductType.find().lean()).map((p) => ({
  ...p,
  _id: p._id.toString(),
}));
  } catch (error) {
    console.error("Error fetching branches:", error);
    return <p>Error loading branches</p>;
  }
  return <ShippingForm branchList={branchList} ProductType={productTypes} distanceType={distanceTypes}/>;
}