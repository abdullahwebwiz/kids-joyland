import mongoose from 'mongoose';

export type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};
export type ShippingDetails = {
  postalCode: string;
  address: string;
  city: string;
  country: string;
  fullName: string;
  phone: string;
};
const ShippingDetailsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: { type: Boolean, required: true, default: false },
    shippingDetails: ShippingDetailsSchema,
  },
  { timestamps: true },
);

const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema);

export default UserModel;
