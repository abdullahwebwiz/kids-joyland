import dbConnect from '@/lib/dbConnect';
import SocialMediaModel from '@/lib/models/SocialMediaModel';
export const GET = async (req: any) => {
  await dbConnect();
  const x = await SocialMediaModel.findOne({ xid: '123' });
  return Response.json(x);
};
