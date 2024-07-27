import cloudinary from 'cloudinary';

import { auth } from '@/lib/auth';

export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  const { publicId } = await req.json();
  console.log(publicId);
  if (publicId != 'no') {
    cloudinary.v2.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
    cloudinary.v2.uploader.destroy(publicId);
  }
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_SECRET!,
  );

  return Response.json({ signature, timestamp });
}) as any;
