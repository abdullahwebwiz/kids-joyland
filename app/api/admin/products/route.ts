import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const products = await ProductModel.find();
  return Response.json(products);
}) as any;

export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const product = new ProductModel({
    name: 'sample name',
    slug: 'sample-name-' + Math.random(),
    image:
      'https://res.cloudinary.com/dqxlehni0/image/upload/v1715622109/No_Image_Available_kbdno1.jpg',
    image2:
      'https://res.cloudinary.com/dqxlehni0/image/upload/v1715622109/No_Image_Available_kbdno1.jpg',
    image3:
      'https://res.cloudinary.com/dqxlehni0/image/upload/v1715622109/No_Image_Available_kbdno1.jpg',
    image4:
      'https://res.cloudinary.com/dqxlehni0/image/upload/v1715622109/No_Image_Available_kbdno1.jpg',
    image5:
      'https://res.cloudinary.com/dqxlehni0/image/upload/v1715622109/No_Image_Available_kbdno1.jpg',

    price: 0,
    video: 'UvQAg7BPm8k',
    category: 'sample category',
    brand: 'sample brand',
    countInStock: 10,
    description: 'sample description',
    rating: 5,
    numReviews: 0,
    banner: 'none',
    reviews: [
      { name: 'John', comment: 'Nice!!', stars: 5 },
      { name: 'David', comment: 'Exellent!!', stars: 5 },
      { name: 'Peter', comment: 'Wonderful!!', stars: 5 },
    ],
  });
  try {
    await product.save();
    return Response.json(
      { message: 'Product created successfully', product },
      {
        status: 201,
      },
    );
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      },
    );
  }
}) as any;
