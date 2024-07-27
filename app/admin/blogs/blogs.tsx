'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Blog } from '@/lib/models/BlogModel';
import { formatId } from '@/lib/utils';

export default function Blogs() {
  const { data: blogs, error } = useSWR(`/api/admin/blogs`);
  const router = useRouter();

  const { trigger: deleteBlog } = useSWRMutation(
    `/api/admin/blogs`,
    async (url, { arg }: { arg: { BlogId: string } }) => {
      const toastId = toast.loading('Deleting Blog...');
      const res = await fetch(`${url}/${arg.BlogId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success('Blog deleted successfully', {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          });
    },
  );

  const { trigger: createBlog, isMutating: isCreating } = useSWRMutation(
    `/api/admin/blogs`,
    async (url) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success('Blog created successfully');
      router.push(`/admin/blogs/${data.blog._id}`);
    },
  );

  if (error) return 'An error has occurred.';
  if (!blogs) return 'Loading...';

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='py-4 text-2xl'>Blogs</h1>
        <button
          disabled={isCreating}
          onClick={() => createBlog()}
          className='btn btn-primary btn-sm'
        >
          {isCreating && <span className='loading loading-spinner'></span>}
          Create
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>WRITER</th>
              <th>THUMBNAIL</th>
              <th>ARTICLE</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog: any) => (
              <tr key={blog._id}>
                <td>{formatId(blog._id!)}</td>
                <td>{blog.title}</td>
                <td>{blog.writer}</td>
                <td>
                  <Link href={blog.image} target='_blank'>
                    {'View Thumbnail'}
                  </Link>
                </td>
                <td>
                  <Link href={'/blog/' + blog.slug} target='_blank'>
                    {'View Article'}
                  </Link>
                </td>
                <td>
                  <Link
                    href={`/admin/blogs/${blog._id!}`}
                    type='button'
                    className='btn btn-ghost btn-sm'
                  >
                    Edit
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => deleteBlog({ BlogId: blog._id! })}
                    type='button'
                    className='btn btn-ghost btn-sm'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
