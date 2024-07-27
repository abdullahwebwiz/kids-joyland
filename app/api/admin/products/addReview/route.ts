import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';

export const PUT = auth(async (...args: any) => {
  const [req] = args;
  const { name, comment, stars, pid } = await req.json();
  console.log(name, comment, stars, pid);
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  try {
    await dbConnect();
    const product = await ProductModel.updateOne(
      { _id: pid },
      { $push: { reviews: { name, comment, stars } } }, // Replace 'yourArray' with the actual array field name
    );

    return Response.json(
      { message: 'Review Successfully added', product },
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
