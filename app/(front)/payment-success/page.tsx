'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useLocalStorage from 'use-local-storage';

export default function PaymentSuccess() {
  let [orderID, setOrderID] = useLocalStorage<any>('orderID', '');
  useEffect(() => {
    if (orderID) {
      fetch(`/api/orders/${orderID}/capture-stripe-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((orderData) => {
          localStorage.removeItem('orderID');
          localStorage.removeItem('amount');
          toast.success('Order paid successfully');
        });
    }
  }, [orderID]);
  if (orderID) {
    return (
      <main className='m-10 mx-auto max-w-6xl rounded-md border bg-gradient-to-tr from-blue-500 to-purple-500 p-10 text-center text-white'>
        <div className='mb-10'>
          <h1 className='mb-2 text-4xl font-extrabold'>Thank you!</h1>
          <h2 className='my-1 text-2xl'>
            YOur Payment was received Successfully ✅✅
          </h2>
          <Link href='/order-history' className='btn'>
            Back To Orders
          </Link>
        </div>
      </main>
    );
  } else {
    return (
      <div className='grid flex-1 place-items-center'>
        <div className='flex flex-col justify-center'>
          <h1 className='mb-4 text-xl font-semibold'>Page not accessible.</h1>
          <Link href='/' className='btn'>
            Back Home
          </Link>
        </div>
      </div>
    );
  }
}
