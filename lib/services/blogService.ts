import { cache } from 'react';
import dbConnect from '@/lib/dbConnect';
import BlogModel from '../models/BlogModel';

export const revalidate = 3600;

const getBySlug = cache(async (slug: string) => {
  await dbConnect();
  const blog = await BlogModel.findOne({ slug }).lean();
  return blog as any;
});
const getAllBlogs = cache(async () => {
  await dbConnect();
  const blogs = await BlogModel.find().lean();
  return blogs as any;
});
const blogService = {
  getBySlug,
  getAllBlogs,
};

export default blogService;
