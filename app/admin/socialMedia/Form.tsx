'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ValidationRule, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import SocialMediaModel, { SocialMedia } from '@/lib/models/SocialMediaModel';

export default function BlogEditForm() {
  const { data: socialMedia, error } = useSWR(`/api/admin/socialmedia`);
  const router = useRouter();
  console.log(socialMedia);
  const { trigger: updateSocialMedia, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/socialmedia`,
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

      toast.success('updated successfully');
      router.push('/admin/dashboard');
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<any>();

  useEffect(() => {
    if (!socialMedia) return;
    setValue('address', socialMedia?.address);
    setValue('phone', socialMedia?.phone);
    setValue('email', socialMedia?.email);
    setValue('whatsapp', socialMedia?.whatsapp);
    setValue('facebook', socialMedia?.facebook);
    setValue('instagram', socialMedia?.instagram);
    setValue('youtube', socialMedia?.youtube);
    setValue('tiktok', socialMedia?.tiktok);
  }, [socialMedia]);

  const formSubmit = async (formData: any) => {
    await updateSocialMedia(formData);
  };

  if (error) return error.message;



  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: any;
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
          <div className='text-error'>{'Something is wrong'}</div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <h1 className='text-1xl py-4'>
        Provide following information including social platform links, phone,
        email and address. It will be displayed to customers for better
        conversion.
      </h1>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormInput name='address' id='address' required />
          <FormInput name='phone' id='phone' required />
          <FormInput name='email' id='email' required />
          <FormInput name='whatsapp' id='whatsapp' required />
          <FormInput name='facebook' id='facebook' required />
          <FormInput name='instagram' id='instagram' required />
          <FormInput name='youtube' id='youtube' required />
          <FormInput name='tiktok' id='tiktok' required />
          <button
            type='submit'
            disabled={isUpdating}
            className='btn btn-primary'
          >
            {isUpdating && <span className='loading loading-spinner'></span>}
            Save
          </button>
          <Link className='btn ml-4 ' href='/admin/dashboard'>
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
