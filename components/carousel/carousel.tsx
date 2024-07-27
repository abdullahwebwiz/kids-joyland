import Image from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';
import {
  Carousel as SCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import productService from '@/lib/services/productService';

const Carousel = async () => {
  const featuredProducts = await productService.getFeatured();

  return (
    <SCarousel opts={{ loop: true }}>
      <CarouselContent>
        {featuredProducts.map(async (product) => {
          console.log(product);
          const buffer = await fetch(product?.banner).then(async (res) =>
            Buffer.from(await res.arrayBuffer()),
          );
          const { base64 } = await getPlaiceholder(buffer);
          return (
            <CarouselItem key={product._id}>
              <div className='w-full overflow-hidden rounded-lg'>
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.banner}
                    className='h-[304px] w-full object-cover lg:h-[536px]'
                    width={1500}
                    height={300}
                    alt={product.name}
                    blurDataURL={base64}
                    placeholder='blur'
                    sizes='(max-width: 1500px) 100vw, 1500px'
                    priority
                  />
                </Link>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className='absolute left-4 top-1/2' />
      <CarouselNext className='absolute right-4 top-1/2' />
    </SCarousel>
  );
};

export default Carousel;

export const CarouselSkeleton = () => {
  return <div className='skeleton h-[304px] w-full rounded-lg lg:h-[536px]' />;
};
