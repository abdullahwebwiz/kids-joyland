'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ValidationRule, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Blog } from '@/lib/models/BlogModel';
import { formatId } from '@/lib/utils';
import { TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function BlogEditForm({ blogId }: { blogId: string }) {
  const { data: blog, error } = useSWR(`/api/admin/blogs/${blogId}`);
  const [value, setvalue] = useState('');
  const router = useRouter();

  const { trigger: updateBlog, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/blogs/${blogId}`,
    async (url, { arg }) => {
      const res = await fetch(`${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success('Blog updated successfully');
      router.push('/admin/blogs');
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Blog>();
  useEffect(() => {
    setValue('content', value);
  }, [value]);
  useEffect(() => {
    if (!blog) return;
    setValue('title', blog.title);
    setValue('image', blog.image);
    setValue('writer', blog.writer);
    setValue('content', blog.content);
    setvalue(blog.content);
    setValue('slug', blog.slug);
  }, [blog, setValue]);

  const formSubmit = async (formData: any) => {
    await updateBlog(formData);
  };

  if (error) return error.message;

  if (!blog) return 'Loading...';

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Blog;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className='mb-6 md:flex'>
      <label className='label md:w-1/5' htmlFor={id}>
        {name}
      </label>
      <div className='md:w-4/5'>
        <input
          type='text'
          id={id}
          {...register(id, {
            required: required && `${name} is required`,
            pattern,
          })}
          className='input input-bordered w-full max-w-md'
        />
        {errors[id]?.message && (
          <div className='text-error'>{errors[id]?.message}</div>
        )}
      </div>
    </div>
  );

  const uploadHandler = async (e: any) => {
    const toastId = toast.loading('Uploading image... ');
    try {
      const resSign = await fetch('/api/cloudinary-sign', {
        method: 'POST',
        body: JSON.stringify({ publicId :'no'}),
      });
      const { signature, timestamp } = await resSign.json();
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await res.json();
      console.log(data.secure_url);
      setValue('image', data.secure_url);
      toast.success('File uploaded successfully', {
        id: toastId,
      });
    } catch (err: any) {
      console.log(err);
      toast.error(err.message, {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <h1 className='text-1xl py-4'>
        Edit Blog {formatId(blogId)}, Try to use lightweight images like: .webp
        and others. Try using Image converters, Inhancers and compressors
      </h1>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormInput name='title' id='title' required />
          <FormInput name='Slug' id='slug' required />
          <FormInput name='writer' id='writer' required />
          <FormInput name='Image' id='image' required />
          <div className='mb-6 md:flex'>
            <label className='label md:w-1/5' htmlFor='imageFile'>
              Upload Thumbnail
            </label>
            <div className='md:w-4/5'>
              <input
                type='file'
                className='file-input w-full max-w-md'
                id='imageFile'
                onChange={uploadHandler}
              />
            </div>
          </div>
          <ReactQuill value={value} onChange={setvalue} />

          <button
            type='submit'
            disabled={isUpdating}
            className='btn btn-primary'
          >
            {isUpdating && <span className='loading loading-spinner'></span>}
            Update
          </button>
          <Link className='btn ml-4 ' href='/admin/blogs'>
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
