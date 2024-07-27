import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlaiceholder } from 'plaiceholder';
import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
const ShareUrl = dynamic(() => import('@/components/products/ShareUrl'));
const PlayVideo = dynamic(() => import('@/components/products/PlayVideo'));
const AddToCart = dynamic(() => import('@/components/products/AddToCart'));
const Rating = dynamic(() => import('@/components/products/Rating').then(mod => mod.Rating));
const Review = dynamic(() => import('@/components/products/Reviews').then(mod => mod.Review));
const ReviewSkeleton = dynamic(() => import('@/components/products/Reviews').then(mod => mod.ReviewSkeleton));

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const product = await productService.getBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const product: any = await productService.getBySlug(params.slug);
  const totalStars = product.reviews.reduce(
    (sum: any, review: any) => sum + review.stars,
    0,
  );
  let newReviews = product.reviews.map(({ _id, ...rest }: any) => {
    return rest;
  });
  if (!product) {
    return notFound();
  }

  const buffer = await fetch(product.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <div className='my-2'>
      <div className='my-4'>
        <Link href='/' className='btn'>{`<- Back to Products`}</Link>
      </div>
      <div className='grid gap-4 md:grid-cols-4'>
        <div className='relative aspect-square md:col-span-2'>
          <Image
            src={product.image}
            alt={product.name}
            placeholder='blur'
            blurDataURL={base64}
            width={640}
            height={640}
            sizes='100vw'
            className='h-full w-full object-contain'
          />
        </div>
        <div>
          <ul className='space-y-4'>
            <li>
              <h1 className='text-xl'>{product.name}</h1>
            </li>
            <li>
              <Rating
                value={totalStars / newReviews?.length}
                caption={`${newReviews?.length} ratings`}
              />
            </li>
            <li>{product.brand}</li>
            <li>
              <PlayVideo video={product.video} />
              <ShareUrl />
            </li>
            <li>
              <div className='divider'></div>
            </li>
            <li>
              <p>Description: {product.description}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className='card mt-3 bg-base-300 shadow-xl md:mt-0'>
            <div className='card-body'>
              <div className='flex justify-between'>
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className='mb-2 flex justify-between'>
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
                </div>
              </div>
              {product.countInStock !== 0 && (
                <div className='card-actions justify-center'>
                  <AddToCart
                    item={{
                      ...convertDocToObj(product),
                      qty: 0,
                      color: '',
                      size: '',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='carousel carousel-vertical  flex content-center items-center justify-center rounded-box'>
        <div className='carousel-item m-10 h-full rounded-lg'>
          <Image
            src={product.image}
            width={400}
            height={400}
            alt={'product-image'}
          />
        </div>
        {product?.image2 == 'none' ? null : (
          <div className='carousel-item m-2 h-full rounded-lg'>
            <Image
              src={product?.image2}
              width={400}
              height={400}
              alt={'product-image'}
            />{' '}
          </div>
        )}
        {product?.image3 == 'none' ? null : (
          <div className='carousel-item m-2 h-full rounded-lg'>
            <Image
              src={product?.image3}
              width={400}
              height={400}
              alt={'product-image'}
            />{' '}
          </div>
        )}
        {product?.image4 == 'none' ? null : (
          <div className='carousel-item m-2 h-full rounded-lg'>
            <Image
              src={product?.image4}
              width={400}
              height={400}
              alt={'product-image'}
            />{' '}
          </div>
        )}
        {product?.image5 == 'none' ? null : (
          <div className='carousel-item m-2 h-full rounded-lg'>
            <Image
              src={product?.image5}
              width={400}
              height={400}
              alt={'product-image'}
            />{' '}
          </div>
        )}
      </div>

      <Suspense fallback={<ReviewSkeleton />}>
        <Review reviews={newReviews} productId={product._id} />{' '}
      </Suspense>
    </div>
  );
};

export default ProductPage;
