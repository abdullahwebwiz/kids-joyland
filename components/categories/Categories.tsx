import Image from 'next/image';
import Link from 'next/link';

import Overlay from './Overlay';
import i1 from '../../public/images/categories/i1.webp';
import i2 from '../../public/images/categories/i2.webp';
import i3 from '../../public/images/categories/i3.webp';

const Categories = () => {
  return (
    <div className='grid auto-rows-[300px] grid-cols-2 gap-4 md:auto-rows-[330px] md:grid-cols-4'>
      <Link
        href='/search?category=Shirts'
        className='group relative col-span-2 row-span-1 overflow-hidden md:row-span-2'
      >
        <Image
          src={i1}
          alt='Collection of shirts'
          width={500}
          height={500}
          className='h-full w-full object-cover'
          priority
        />
        <Overlay category='Shirts' />
      </Link>
      <Link
        href='/search?category=Shirts'
        className='group relative col-span-2 overflow-hidden'
      >
        <Image
          src={i2}
          alt='Collection of pants'
          width={500}
          height={500}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px' // Responsive sizes
          className='h-full w-full object-cover'
          placeholder='blur'
          loading='lazy' // Use priority for above-the-fold images
        />
        <Overlay category='Pants' />
      </Link>
      <Link
        href='/search?category=Handbags'
        className='group relative col-span-2 overflow-hidden'
      >
        <Image
          src={i3}
          alt='Collection of handbags'
          width={500}
          height={500}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px' // Responsive sizes
          className='h-full w-full object-cover'
          placeholder='blur'
          loading='lazy' // Use priority for above-the-fold images
        />
        <Overlay category='Handbags' />
      </Link>
    </div>
  );
};

export default Categories;
