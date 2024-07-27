import Blogs from '@/app/admin/blogs/blogs';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import BlogModel from '@/lib/models/BlogModel';
export const GET = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const blog = await BlogModel.findById(params.id);
  if (!blog) {
    return Response.json(
      { message: 'blog not found' },
      {
        status: 404,
      },
    );
  }
  return Response.json(blog);
}) as any;

export const PUT = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }

  const { title, writer, content, slug, image } = await req.json();
  console.log({
    title,
    writer,
    content,
    slug,
    image,
  });
  try {
    await dbConnect();

    const blog = await BlogModel.findById(params.id);
    if (blog) {
      blog.title = title;
      blog.slug = slug;
      blog.writer = writer;
      blog.content = content;
      blog.image = image;

      const updatedBlog = await blog.save();
      return Response.json(updatedBlog);
    } else {
      return Response.json(
        { message: 'blog not found' },
        {
          status: 404,
        },
      );
    }
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      },
    );
  }
}) as any;

export const DELETE = auth(async (...args: any) => {
  const [req, { params }] = args;

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
    const blog = await BlogModel.findById(params.id);
    if (blog) {
      await BlogModel.deleteOne();
      return Response.json({ message: 'blog deleted successfully' });
    } else {
      return Response.json(
        { message: 'blog not found' },
        {
          status: 404,
        },
      );
    }
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      },
    );
  }
}) as any;
