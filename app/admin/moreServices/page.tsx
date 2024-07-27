import AdminLayout from '@/components/admin/AdminLayout';
import { Download, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
export const metadata = {
  title: 'Admin Dashboard',
};
const DashbaordPage = () => {
  return (
    <AdminLayout activeItem='contactSupport'>
      <div className='flex flex-col items-center justify-center'>
        {' '}
        <Image
          src={'/moreServices.svg'}
          width={500}
          height={500}
          alt='more-services'
        />
        <Link
          href={
            'https://api.whatsapp.com/send/?phone=923199443575&text&type=phone_number&app_absent=0'
          }
          target='_blank'
        >
          <button className='w-half btn btn-primary mx-2' type='button'>
            Contact Now <Send />
          </button>
        </Link>
      </div>
    </AdminLayout>
  );
};

export default DashbaordPage;
