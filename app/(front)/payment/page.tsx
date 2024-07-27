import { Metadata } from 'next';
import dynamic from 'next/dynamic';
const Form = dynamic(() => import('./Form'));
export const metadata: Metadata = {
  title: 'Payment method',
};

const PaymentPage = async () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default PaymentPage;
