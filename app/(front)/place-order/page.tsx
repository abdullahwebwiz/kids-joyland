import { Metadata } from 'next';

import dynamic from 'next/dynamic';

const Form = dynamic(() => import('./Form'));

export const metadata: Metadata = {
  title: 'Place order',
};

const PlaceOrderPage = () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default PlaceOrderPage;
