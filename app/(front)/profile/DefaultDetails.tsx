'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';

type Inputs = {
  postalCode: string;
  address: string;
  city: string;
  country: string;
  fullName: string;
  phone: string;
};

const DefaultDetails = () => {
  const { data: session, update } = useSession();
  const { data: user, error } = useSWR(`/api/user/${session?.user?._id}`);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      postalCode: '',
      address: '',
      city: '',
      country: '',
      fullName: '',
      phone: '',
    },
  });


  useEffect(() => {
    console.log(user);
    if (session && user) {
      setValue('fullName', user.shippingDetails.fullName);
      setValue('phone', user.shippingDetails.phone);
      setValue('postalCode', user.shippingDetails.postalCode);
      setValue('city', user.shippingDetails.city);
      setValue('address', user.shippingDetails.address);
      setValue('country', user.shippingDetails.country);
    }
  }, [user, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { postalCode, address, city, country, fullName, phone } = form;
    try {
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: session?.user._id,
          postalCode,
          address,
          city,
          country,
          fullName,
          phone,
        }),
      });
      if (res.status === 200) {
        toast.success('Profile updated successfully');
      } else {
        const data = await res.json();
        toast.error(data.message || 'error');
      }
    } catch (err: any) {
      const error =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast.error(error);
    }
  };

  return (
    <div className='card mx-auto my-4 max-w-sm bg-base-300'>
      <div className='card-body'>
        <h1 className='card-title'>Default Shipping Details</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className='my-2'>
            <label className='label' htmlFor='fullName'>
              Full Name
            </label>
            <input
              type='text'
              id='fullName'
              {...register('fullName', {
                required: 'Full Name is required',
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.fullName?.message && (
              <div className='text-error'>{errors.fullName.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label className='label' htmlFor='phone'>
              Phone
            </label>
            <input
              type='text'
              id='phone'
              {...register('phone', {
                required: 'Phone Number is required',
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.phone?.message && (
              <div className='text-error'>{errors.phone.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label className='label' htmlFor='fullName'>
              Postal Code
            </label>
            <input
              type='text'
              id='postalCode'
              {...register('postalCode', {
                required: 'Postal Code is required',
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.postalCode?.message && (
              <div className='text-error'>{errors.postalCode.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label className='label' htmlFor='fullName'>
              Address
            </label>
            <input
              type='text'
              id='address'
              {...register('address', {
                required: 'address is required',
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.address?.message && (
              <div className='text-error'>{errors.address.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label className='label' htmlFor='fullName'>
              City
            </label>
            <input
              type='text'
              id='city'
              {...register('city', {
                required: 'City is required',
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.city?.message && (
              <div className='text-error'>{errors.city.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label className='label' htmlFor='fullName'>
              Country
            </label>
            <input
              type='text'
              id='country'
              {...register('country', {
                required: 'country is required',
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.country?.message && (
              <div className='text-error'>{errors.country.message}</div>
            )}
          </div>
          <div className='my-2'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary w-full'
            >
              {isSubmitting && (
                <span className='loading loading-spinner'></span>
              )}
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DefaultDetails;
