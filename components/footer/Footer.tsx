'use client';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
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
import { useEffect } from 'react';

const Footer = () => {
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
  } = useSWR('/api/products/blogs');
  const {
    data: socialMedia,
    error: socialMediaError,
    isLoading: socialMediaLoading,
  } = useSWR('/api/products/socialMedia');
  useEffect(() => {
    console.log(articles);
    console.log(brands);
    console.log(socialMedia);
    console.log(categories);
    console.log(brandsError);
    console.log(categoriesError);
    console.log(socialMediaError);
    console.log(articlesError);
  }, [
    articles,
    brands,
    categories,
    socialMedia,
    brandsError,
    articlesError,
  ]);
  if (!categories || !brands || !articles || !socialMedia)
    return (
      <div className='skeleton h-[304px] w-full rounded-lg lg:h-[536px]' />
    );

  return (
    <footer className='footer bg-base-200 p-10 text-base-content'>
      <aside>
        <Image
          src={'/images/logo.png'}
          width={60 * 3}
          height={60}
          alt={'logo'}
        />
        <p className='w-[200px]'>{process.env.NEXT_PUBLIC_APP_DESC}</p>
      </aside>
      <nav>
        <h6 className='footer-title'>Information - Feel free to contact</h6>
        <Link href={'#'} className='flex items-center'>
          {socialMedia.phone + ' '}{' '}
          <Phone size={16} style={{ marginLeft: '5px' }} />
        </Link>
        <Link href={'#'} className='flex items-center'>
          {socialMedia.email + ' '}{' '}
          <Mail size={16} style={{ marginLeft: '5px' }} />
        </Link>
        <Link href={'#'} className='flex items-center'>
          {socialMedia.address + ' '}
          <MapPin size={16} style={{ marginLeft: '5px' }} />
        </Link>
      </nav>
      <nav>
        <h6 className='footer-title'>Categories</h6>
        {categories.map((category: string) => (
          <Link
            key={category}
            href={`/search?category=${category}`}
            className='link-hover link'
          >
            {category}
          </Link>
        ))}
      </nav>
      <nav>
        <h6 className='footer-title'>Brands</h6>
        {brands.map((brand: string) => (
          <Link
            key={brand}
            href={`/search?brand=${brand}`}
            className='link-hover link'
          >
            {brand}
          </Link>
        ))}
      </nav>
      <nav>
        <h6 className='footer-title'>Articles</h6>
        {articles.map((article: any) => (
          <Link
            key={article._id}
            href={`/blog/${article.slug}`}
            className='link-hover link'
          >
            {article.title}
          </Link>
        ))}
      </nav>
      <nav>
        <h6 className='footer-title'>Social Media</h6>
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
      </nav>
    </footer>
  );
};

export default Footer;
