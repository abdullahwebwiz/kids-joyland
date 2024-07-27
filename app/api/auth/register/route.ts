import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();
  await dbConnect();
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
    isAdmin: false,
    shippingDetails: {
      fullName: name,
      postalCode: '000000',
      address: 'my address',
      city: 'my city',
      country: 'my country',
      phone:'000000000000'
    },
  });
  try {
    await newUser.save();
    return Response.json(
      { message: 'User has been created' },
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
};
