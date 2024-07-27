import mongoose from 'mongoose';

export type Blog = {
  image: string;
  title: string;
  slug: string;
  content: string;
  writer: string;
};

const BlogSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String, required: true },
    writer: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const BlogModel = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default BlogModel;
