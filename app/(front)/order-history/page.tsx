import { Metadata } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';
const MyOrders = dynamic(() => import('./MyOrders'));
export const metadata: Metadata = {
  title: 'Order History',
};

const MyOrderPage = () => {
  return (
    <div>
      <h1 className='py-2 text-2xl'>Order History</h1>
      <MyOrders />
    </div>
  );
};

export default MyOrderPage;
