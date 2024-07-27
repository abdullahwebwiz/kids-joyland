import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import SocialMediaModel from '@/lib/models/SocialMediaModel';

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
  const socialMedia = await SocialMediaModel.findOne({ xid: '123' });
  return Response.json(socialMedia);
}) as any;

export const PUT = auth(async (req: any) => {  
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  try {
    const {
      address,
      phone,
      whatsapp,
      email,
      instagram,
      facebook,
      youtube,
      tiktok,
    } = await req.json();

    const newData = {
      address,
      phone,
      whatsapp,
      email,
      instagram,
      facebook,
      youtube,
      tiktok,
    };

    await SocialMediaModel.findOneAndUpdate({ xid: '123' }, { $set: newData });
    return Response.json(
      { message: 'successfully updated' },
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
