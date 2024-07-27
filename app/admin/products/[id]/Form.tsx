'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ValidationRule, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { v2 as cloudinary } from 'cloudinary';
import { Product } from '@/lib/models/ProductModel';
import { formatId } from '@/lib/utils';
import Swal from 'sweetalert2';
export default function ProductEditForm({ productId }: { productId: string }) {
  const { data: product, error } = useSWR(`/api/admin/products/${productId}`);
  const router = useRouter();
  const [alertShow, setAlertShow] = useState(true);
  const { trigger: updateProduct, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/products/${productId}`,
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

      toast.success('Product updated successfully');
      router.push('/admin/products');
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  useEffect(() => {
    if (!product) return;
    setValue('name', product.name);
    setValue('slug', product.slug);
    setValue('price', product.price);
    setValue('image', product.image);
    setValue('image2', product.image2);
    setValue('image3', product.image3);
    setValue('image4', product.image4);
    setValue('image5', product.image5);
    setValue('video', product.video);
    setValue('category', product.category);
    setValue('banner', product.banner);
    setValue('brand', product.brand);
    setValue('countInStock', product.countInStock);
    setValue('description', product.description);
  }, [product, setValue]);

  const formSubmit = async (formData: any) => {
    await updateProduct(formData);
  };

  if (error) return error.message;

  if (!product) return 'Loading...';

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Product;
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
    let decision: any = !alertShow
      ? { isConfirmed: true }
      : await Swal.fire({
          title: 'Read Carefully!',
          icon: 'warning',
          html: `
             <p>
             <p>📌 Changing image is irreversible action.</p>
             <p>📌 Do not refresh the page before submission.</p>
             <p>📌 You can change images only once in every edit.</p>
             <p>📌 Make sure to submit the form after changing images.</p>
             <p>📌 other wise you will lose your images.</p>
             </p>
             `,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Change Image',
          cancelButtonText: 'Not Now',
        });
    setAlertShow(false);
    if (decision.isConfirmed) {
      let whichImage = e.target.id;
      let oldImage = product[whichImage];
      const parts = oldImage.split('/');
      const filename = parts.pop();
      const publicId = filename.split('.')[0];
      const toastId = toast.loading('Uploading image... ');
      try {
        const resSign = await fetch('/api/cloudinary-sign', {
          method: 'POST',
          body: JSON.stringify({ publicId }),
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
        console.log(data);
        if (!data?.error) {
          if (whichImage == 'image') {
            setValue('image', data.secure_url);
          } else if (whichImage == 'image2') {
            setValue('image2', data.secure_url);
          } else if (whichImage == 'image3') {
            setValue('image3', data.secure_url);
          } else if (whichImage == 'image4') {
            setValue('image4', data.secure_url);
          } else if (whichImage == 'image5') {
            setValue('image5', data.secure_url);
          } else if (whichImage == 'banner') {
            setValue('banner', data.secure_url);
          }
          toast.success('File uploaded successfully', {
            id: toastId,
          });
        } else {
          toast.error('Something went wrong, kindly try again later', {
            id: toastId,
          });
        }
      } catch (err: any) {
        toast.error(err.message, {
          id: toastId,
        });
      }
    }
  };

  return (
    <div>
      <h1>Do not Refresh</h1>
      <h2 className='py-4 text-2xl'>
        Edit Product {formatId(productId)}, Try to use lightweight images like:
        .webp and others. Try using Image converters, Inhancers and compressors
      </h2>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormInput name='Name' id='name' required />
          <FormInput name='Slug' id='slug' required />
          <FormInput name='YouTube Video ID' id='video' required />
          <FormInput name='Image' id='image' required />
          <div className='mb-6 md:flex'>
            <label className='label md:w-1/5' htmlFor='image'>
              Upload Image 1
            </label>
            <div className='md:w-4/5'>
              <input
                type='file'
                className='file-input w-full max-w-md'
                id='image'
                onChange={uploadHandler}
              />
            </div>
          </div>
          <div className='mb-6 md:flex'>
            <label className='label md:w-1/5' htmlFor='image2'>
              Upload Image 2 (Optional)
            </label>
            <div className='md:w-4/5'>
              <input
                type='file'
                className='file-input w-full max-w-md'
                id='image2'
                onChange={uploadHandler}
              />
            </div>
          </div>
          <div className='mb-6 md:flex'>
            <label className='label md:w-1/5' htmlFor='image3'>
              Upload Image 3 (Optional)
            </label>
            <div className='md:w-4/5'>
              <input
                type='file'
                className='file-input w-full max-w-md'
                id='image3'
                onChange={uploadHandler}
              />
            </div>
          </div>
          <div className='mb-6 md:flex'>
            <label className='label md:w-1/5' htmlFor='image4'>
              Upload Image 4 (Optional)
            </label>
            <div className='md:w-4/5'>
              <input
                type='file'
                className='file-input w-full max-w-md'
                id='image4'
                onChange={uploadHandler}
              />
            </div>
          </div>
          <div className='mb-6 md:flex'>
            <label className='label md:w-1/5' htmlFor='image5'>
              Upload Image 5 (Optional)
            </label>
            <div className='md:w-4/5'>
              <input
                type='file'
                className='file-input w-full max-w-md'
                id='image5'
                onChange={uploadHandler}
              />
            </div>
          </div>
          <div className='mb-6 md:flex'>
            <label className='label md:w-1/5' htmlFor='banner'>
              Banner (Only if Featured, 1792 x 1024 ideal size, .webp
              recommended)
            </label>
            <div className='md:w-4/5'>
              <input
                type='file'
                className='file-input w-full max-w-md'
                id='banner'
                onChange={uploadHandler}
              />
            </div>
          </div>
          <FormInput name='Price' id='price' required />
          <FormInput name='Category' id='category' required />
          <FormInput name='Brand' id='brand' required />
          <FormInput name='Description' id='description' required />
          <FormInput name='Count In Stock' id='countInStock' required />

          <button
            type='submit'
            disabled={isUpdating}
            className='btn btn-primary'
          >
            {isUpdating && <span className='loading loading-spinner'></span>}
            Update
          </button>
          <Link className='btn ml-4 ' href='/admin/products'>
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
