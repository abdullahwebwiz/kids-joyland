import AdminLayout from '@/components/admin/AdminLayout';
import { Download, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';

export const metadata = {
  title: 'Admin | Tools',
};

const toolApi = async () => {
  let response = await fetch('https://tools-api-eight.vercel.app/');
  let result = await response.json();
  return result;
};

const DashbaordPage = async () => {
  let toolsData = await toolApi();
  console.log(toolsData);
  return (
    <AdminLayout activeItem='tools'>
      <div className='flex flex-row flex-wrap items-center justify-center'>
        {!toolsData
          ? 'wait...'
          : toolsData.map(async (d: any) => {
              const buffer = await fetch(d.image).then(async (res) =>
                Buffer.from(await res.arrayBuffer()),
              );

              const { base64 } = await getPlaiceholder(buffer);
              return (
                <div className='card m-3 flex h-[385px] w-72 flex-col items-center justify-center border border-gray-300 bg-base-100 shadow-xl'>
                  <figure className='px-6 pt-6'>
                    <Image
                      src={d.image}
                      alt='Shoes'
                      className='rounded-xl'
                      width={100}
                      height={100}
                      placeholder='blur'
                      blurDataURL={base64}
                    />
                  </figure>
                  <div className='card-body items-center text-center'>
                    <h2 className='card-title'>{d.name}</h2>
                    <p>{d.description}</p>
                    <div className='card-actions'>
                      <Link href={d.url} target='_blank'>
                        {' '}
                        <button className='btn btn-primary'>Use Now</button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </AdminLayout>
  );
};

export default DashbaordPage;
