import bcrypt from 'bcryptjs';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';

export const GET = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  try {
    const dbUser = await UserModel.findById({ _id: params.id });
    if (!dbUser) {
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        },
      );
    }
    console.log(dbUser);
    return Response.json(dbUser);
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      },
    );
  }
});
