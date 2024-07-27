import { Metadata } from 'next';
import { Suspense } from 'react';

import dynamic from 'next/dynamic';

const Carousel = dynamic(() => import('@/components/carousel/carousel'));
const CarouselSkeleton = dynamic(() =>
  import('@/components/carousel/carousel').then((mod) => mod.CarouselSkeleton),
);
const Categories = dynamic(() => import('@/components/categories/Categories'));
const Icons = dynamic(() => import('@/components/icons/Icons'));
const ProductItems = dynamic(
  () => import('@/components/products/ProductItems'),
);
const ProductItemsSkeleton = dynamic(() =>
  import('@/components/products/ProductItems').then(
    (mod) => mod.ProductItemsSkeleton,
  ),
);
const Slider = dynamic(() => import('@/components/slider/Slider'));
const AllBlogs = dynamic(() => import('@/components/AllBlogs'));
const BlogsSkeleton = dynamic(() =>
  import('@/components/AllBlogs').then((mod) => mod.BlogsSkeleton),
);

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Fullstack Next.js Store',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Fullstack Next.js Store - Server Components, MongoDB, Next Auth, Tailwind, Zustand',
};

const HomePage = () => {
  return (
    <div className='my-8 flex flex-col gap-4 md:gap-16'>
      <div>
        <Suspense fallback={<CarouselSkeleton />}>
          <Carousel />
        </Suspense>
      </div>
      <div className='flex flex-col gap-8 md:flex-row'>
        <div className='flex-1'>
          <p className='text-nowrap text-1xl font-semibold md:text-2xl'>
            {process.env.NEXT_PUBLIC_APP_NAME}{' '}
          </p>
        </div>
        <div className='flex flex-1 items-center'>
          <div>{process.env.NEXT_PUBLIC_APP_DESC}</div>
        </div>
      </div>
      <Categories />
      <Icons />

      <Suspense
        fallback={<ProductItemsSkeleton qty={8} name='Latest Products' />}
      >
        <ProductItems />
      </Suspense>

      <Suspense fallback={<ProductItemsSkeleton qty={4} name='Top Rated' />}>
        <Slider />
      </Suspense>
      <Suspense fallback={<BlogsSkeleton qty={8} name='All Blog Posts' />}>
        <AllBlogs />
      </Suspense>
    </div>
  );
};

export default HomePage;
