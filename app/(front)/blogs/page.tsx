import blogService from '@/lib/services/blogService';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
const AllBlogs = dynamic(() => import('@/components/AllBlogs'));
const BlogsSkeleton = dynamic(() => import('@/components/AllBlogs').then(mod => mod.BlogsSkeleton));

export const generateMetadata = async () => {
  return {
    title: 'BLogs',
  };
};

const BlogDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const blogs: any = await blogService.getAllBlogs();
  console.log(blogs);

  return (
    <>
      <Suspense
        fallback={<BlogsSkeleton qty={8} name='All Blog Posts' />}
      >
        <AllBlogs />
      </Suspense>
    </>
  );
};

export default BlogDetailsPage;
