import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import BlogModel from '@/lib/models/BlogModel';


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
  const blogs = await BlogModel.find();
  return Response.json(blogs);
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
  const blog = new BlogModel({
    title: 'sample title',
    content: 'Your article is here...',
    slug: 'sample-title-' + Math.random(),
    writer: 'Peter',
    image:
      'https://res.cloudinary.com/dqxlehni0/image/upload/v1715622109/No_Image_Available_kbdno1.jpg',
  });
  try {
    await blog.save();
    return Response.json(
      { message: 'blog created successfully', blog },
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
