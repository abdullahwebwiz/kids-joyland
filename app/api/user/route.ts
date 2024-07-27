import bcrypt from 'bcryptjs';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';

export const PUT = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ message: 'Not authenticated' }, { status: 401 });
  }
  const { id, postalCode, address, city, country, fullName, phone } =
    await req.json();
  console.log({ id, postalCode, address, city, country, fullName, phone });
  await dbConnect();
  try {
    const dbUser = await UserModel.findById({ _id: id });
    if (!dbUser) {
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        },
      );
    }
    dbUser.shippingDetails.postalCode = postalCode;
    dbUser.shippingDetails.address = address;
    dbUser.shippingDetails.city = city;
    dbUser.shippingDetails.country = country;
    dbUser.shippingDetails.fullName = fullName;
    dbUser.shippingDetails.phone = phone;
    await dbUser.save();
    return Response.json({ message: 'User has been updated' });
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      },
    );
  }
});
