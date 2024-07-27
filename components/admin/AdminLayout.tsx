import Link from 'next/link';

import { auth } from '@/lib/auth';

const AdminLayout = async ({
  activeItem = 'dashboard',
  children,
}: {
  activeItem: string;
  children: React.ReactNode;
}) => {
  const session = await auth();
  if (!session || !session.user.isAdmin) {
    return (
      <div className='relative flex flex-grow p-4'>
        <div>
          <h1 className='text-2xl'>Unauthorized</h1>
          <p>Admin permission required</p>
        </div>
      </div>
    );
  }

  return (
    <div className='relative flex flex-grow'>
      <div className='grid w-full md:grid-cols-5'>
        <div className='bg-base-200'>
          <ul className='menu gap-1'>
            <li>
              <Link
                className={'dashboard' === activeItem ? 'active' : ''}
                href='/admin/dashboard'
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className={'orders' === activeItem ? 'active' : ''}
                href='/admin/orders'
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                className={'products' === activeItem ? 'active' : ''}
                href='/admin/products'
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                className={'users' === activeItem ? 'active' : ''}
                href='/admin/users'
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                className={'blogs' === activeItem ? 'active' : ''}
                href='/admin/blogs'
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                className={'socialMedia' === activeItem ? 'active' : ''}
                href='/admin/socialMedia'
              >
                Social Media
              </Link>
            </li>
            <li>
              <Link
                className={'contactSupport' === activeItem ? 'active' : ''}
                href='/admin/contactSupport'
              >
                Contact Support
              </Link>
            </li>
            <li>
              <Link
                className={'moreServices' === activeItem ? 'active' : ''}
                href='/admin/moreServices'
              >
                More Services
              </Link>
            </li>
            <li>
              <Link
                className={'tools' === activeItem ? 'active' : ''}
                href='/admin/tools'
              >
                Tools
              </Link>
            </li>
          </ul>
        </div>
        <div className='px-4 md:col-span-4'>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
