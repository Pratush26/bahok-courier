import ShippingForm from "../components/ShippingForm";
import connectDB from "@/lib/dbConnect";
import BranchModel from "@/models/Branch";
import { ProductTypeList } from '@/components/doc'

type BranchDetails = {
  division: string;
  name: string;
  available: boolean;
  phone: string[];
  address: string;
};
type ProductTypeList = {
  name: string;
  value: number;
}

export default async function ShippingFormPage() {
  let branchList: BranchDetails[] = [];

  try {
    await connectDB();
    branchList = (await BranchModel.find({ available: true }).lean()).map((branch) => ({
  ...branch,
  _id: branch._id.toString(), // convert ObjectId to string
}));

  } catch (error) {
    console.error("Error fetching branches:", error);
    return <p>Error loading branches</p>;
  }
  return <ShippingForm branchList={branchList} ProductTypeList={ProductTypeList}/>;
}