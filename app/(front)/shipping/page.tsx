import { Metadata } from 'next';
import dynamic from 'next/dynamic';
const Form = dynamic(() => import('./Form'));

export const metadata: Metadata = {
  title: 'Shipping',
};

const ShippingPage = async () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default ShippingPage;
