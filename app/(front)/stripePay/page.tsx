'use client';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { Link } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import useLocalStorage from 'use-local-storage';
import dynamic from 'next/dynamic';
const CheckoutPage = dynamic(() => import('@/components/checkoutPage'));
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  let [amount, setAmount] = useLocalStorage<any>('amount', '');
  let [orderID, setOrderID] = useLocalStorage<any>('orderID', '');
  const { data: session } = useSession();
  if (amount && orderID) {
    return (
      <main className='m-10 mx-auto max-w-6xl rounded-md border bg-gradient-to-tr from-blue-500 to-purple-500 p-10 text-center text-white'>
        <div className='mb-10'>
          <h1 className='mb-2 text-4xl font-extrabold'>{session?.user.name}</h1>
          <h2 className='text-2xl'>
            You are going to pay:
            <span className='font-bold'> ${amount}</span>
          </h2>
        </div>

        <Elements
          stripe={stripePromise}
          options={{
            mode: 'payment',
            amount: convertToSubcurrency(parseInt(amount)),
            currency: 'usd',
          }}
        >
          <CheckoutPage amount={parseInt(amount)} orderID={orderID} />
        </Elements>
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
