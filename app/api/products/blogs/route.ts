import dbConnect from '@/lib/dbConnect';
import BlogModel from '@/lib/models/BlogModel';
export const GET = async (req: any) => {
  await dbConnect();
  const blogs = await BlogModel.find();
  return Response.json(blogs);
};

