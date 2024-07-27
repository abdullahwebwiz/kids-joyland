'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, ValidationRule, useForm } from 'react-hook-form';
import useCartService from '@/lib/hooks/useCartStore';
import { ShippingAddress } from '@/lib/models/OrderModel';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
const CheckoutSteps = dynamic(
  () => import('@/components/checkout/CheckoutSteps'),
);

const Form = () => {
  const router = useRouter();
  const { saveShippingAddress, shippingAddress } = useCartService();
  const { data: session, update } = useSession();
  const { data: user, error } = useSWR(`/api/user/${session?.user?._id}`);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ShippingAddress>({
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (user?.shippingDetails) {
      setValue('fullName', user.shippingDetails.fullName);
      setValue('phone', user.shippingDetails.phone);
      setValue('postalCode', user.shippingDetails.postalCode);
      setValue('address', user.shippingDetails.address);
      setValue('city', user.shippingDetails.city);
      setValue('country', user.shippingDetails.country);
    }
  }, [user]);

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
    setValue('phone', shippingAddress.phone);
  }, [setValue, shippingAddress]);

  const formSubmit: SubmitHandler<ShippingAddress> = async (form) => {
    saveShippingAddress(form);
    router.push('/payment');
  };

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof ShippingAddress;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className='mb-2'>
      <label className='label' htmlFor={id}>
        {name}
      </label>
      <input
        type='text'
        id={id}
        {...register(id, {
          required: required && `${name} is required`,
          pattern,
        })}
        className='input input-bordered w-full max-w-sm'
      />
      {errors[id]?.message && (
        <div className='text-error'>{errors[id]?.message}</div>
      )}
    </div>
  );

  return (
    <div>
      <CheckoutSteps current={1} />
      <div className='card mx-auto my-4 max-w-sm bg-base-300'>
        <div className='card-body'>
          <h1 className='card-title'>Shipping Address</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormInput name='Full Name' id='fullName' required />
            <FormInput name='phone' id='phone' required />{' '}
            <FormInput name='Address' id='address' required />
            <FormInput name='City' id='city' required />
            <FormInput name='Postal Code' id='postalCode' required />
            <FormInput name='Country' id='country' required />
            <div className='my-2'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='btn btn-primary w-full'
              >
                {isSubmitting && <span className='loading loading-spinner' />}
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
