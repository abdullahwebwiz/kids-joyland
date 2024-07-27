'use client';
import Link from 'next/link';
import useSWR from 'swr';
import useLayoutService from '@/lib/hooks/useLayout';
import {
  AtSign,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircleQuestion,
  Phone,
  Youtube,
} from 'lucide-react';

const Sidebar = () => {
  const { toggleDrawer } = useLayoutService();
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useSWR('/api/products/categories');

  const {
    data: brands,
    error: brandsError,
    isLoading: brandsLoading,
  } = useSWR('/api/products/brands');

  const {
    data: articles,
    error: articlesError,
    isLoading: articlesLoading,
  } = useSWR<any>('/api/products/blogs');
  const {
    data: socialMedia,
    error: socialMediaError,
    isLoading: socialMediaLoading,
  } = useSWR('/api/products/socialMedia');

  if (
    categoriesLoading ||
    brandsLoading ||
    articlesLoading ||
    socialMediaLoading ||
    !categories ||
    !brands ||
    !articles ||
    !socialMedia
  )
    return <div>Loading</div>;

  return (
    <div className='flex h-screen w-80 flex-col overflow-scroll bg-base-200 p-4'>
      <div>
        <h2 className='my-2 text-xl'>Shop Information</h2>
        <Link href={'#'} className='link-hover link flex items-center'>
          {socialMedia.phone + ' '}{' '}
          <Phone size={16} style={{ marginLeft: '5px' }} />
        </Link>
        <Link href={'#'} className='link-hover link flex items-center'>
          {socialMedia.email + ' '}{' '}
          <Mail size={16} style={{ marginLeft: '5px' }} />
        </Link>
        <Link href={'#'} className='link-hover link flex items-center'>
          {socialMedia.address + ' '}
          <MapPin size={16} style={{ marginLeft: '5px' }} />
        </Link>
      </div>
      <div className='divider'></div>
      <div>
        <h2 className='my-2 text-xl'>Shop Categories</h2>
        {categories.map((category: string) => (
          <div key={category}>
            {' '}
            <Link
              href={`/search?category=${category}`}
              onClick={toggleDrawer}
              className='link-hover link'
            >
              {category}
            </Link>
            <br />
          </div>
        ))}
      </div>
      <div className='divider'></div>
      <div>
        <h2 className='my-2 text-xl'>Shop Articles</h2>
        {articles.map((article: any) => (
          <div key={article.slug}>
            {' '}
            <Link
              href={`/blog/` + article.slug}
              onClick={toggleDrawer}
              className='link-hover link'
            >
              {article.title}
            </Link>
            <br />
          </div>
        ))}
      </div>
      <div className='divider'></div>
      <div>
        <h2 className='my-2 text-xl'>Shop Brands</h2>
        {brands.map((brand: any, i: any) => (
          <div key={i}>
            {' '}
            <Link
              href={`/search?brand=${brand}`}
              onClick={toggleDrawer}
              className='link-hover link'
            >
              {brand}
            </Link>
            <br />
          </div>
        ))}
      </div>
      <div className='divider'></div>
      <div>
        <h2 className='my-2 text-xl'>Social Media</h2>
        <Link
          target='_blank'
          href={socialMedia.whatsapp}
          className='link-hover link flex items-center'
        >
          WhatsApp{' '}
          <MessageCircleQuestion size={16} style={{ marginLeft: '5px' }} />
        </Link>
        <Link
          target='_blank'
          href={socialMedia.facebook}
          className='link-hover link flex items-center'
        >
          Facebook <Facebook size={16} style={{ marginLeft: '5px' }} />
        </Link>
        <Link
          target='_blank'
          href={socialMedia.instagram}
          className='link-hover link flex items-center'
        >
          Instagram <Instagram size={16} style={{ marginLeft: '5px' }} />
        </Link>
        <Link
          target='_blank'
          href={socialMedia.youtube}
          className='link-hover link flex items-center'
        >
          YouTube <Youtube size={16} style={{ marginLeft: '5px' }} />
        </Link>
        <Link
          target='_blank'
          href={socialMedia.tiktok}
          className='link-hover link flex items-center'
        >
          TikTok <AtSign size={16} style={{ marginLeft: '5px' }} />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
