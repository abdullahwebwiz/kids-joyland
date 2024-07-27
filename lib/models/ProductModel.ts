import mongoose from 'mongoose';

export type Product = {
  _id?: string;
  name: string;
  slug: string;
  image: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  banner: string;
  video: string;
  price: number;
  brand: string;
  description: string;
  category: string;
  rating: number;
  numReviews: number;
  reviews: object;
  countInStock: number;
  colors?: [];
  sizes?: [];
};
export type Review = {
  name: string;
  comment: string;
  stars: number;
};

const reviewSchema = new mongoose.Schema({
  name: { type: String },
  comment: { type: String },
  stars: { type: Number, default: 5 },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    image2: { type: String, required: true, default: 'none' },
    image3: { type: String, required: true, default: 'none' },
    image4: { type: String, required: true, default: 'none' },
    image5: { type: String, required: true, default: 'none' },
    video: { type: String, required: true, default: 'none' },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 5 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 10 },
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    banner: { type: String, default: 'none' },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  },
);

const ProductModel =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default ProductModel;
