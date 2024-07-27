import Image from 'next/image';
import Link from 'next/link';
// @ts-ignore
import { getPlaiceholder } from 'plaiceholder';
// @ts-ignore
import { format } from 'date-fns';

const SingleBlog = async ({ blog }: { blog: any }) => {
  const { title, image, writer, createdAt, slug } = blog;
  const formattedDate = format(new Date(createdAt), 'dd MMM yyyy');
  const buffer = await fetch(blog.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );
  const { base64 } = await getPlaiceholder(buffer);
  return (
    <Link href={'/blog/' + slug} target='_blank'>
      <div className='card m-2 w-96 cursor-pointer bg-base-100 shadow-xl'>
        <figure>
          <Image
            src={image}
            alt={title}
            placeholder='blur'
            blurDataURL={base64}
            width={400}
            height={400 * 0.83}
          />
        </figure>
        <div className='card-body'>
          <h1 className='card-title'>
            POST!
            <div className='badge badge-secondary'>NEW</div>
          </h1>
          <h2>{title}...</h2>
          <h3>{formattedDate}</h3>
          <div className='card-actions justify-end'>
            <div className='badge badge-outline'>E-commerce</div>
            <div className='badge badge-outline'>Products</div>
          </div>
          <div className='card-actions justify-end'>
            <div className='badge badge-outline'>{writer}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleBlog;
