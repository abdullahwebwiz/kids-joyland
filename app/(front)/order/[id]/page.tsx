import dynamic from 'next/dynamic';
const OrderDetails = dynamic(() => import('./OrderDetails'));

export const generateMetadata = ({ params }: { params: { id: string } }) => {
  return {
    title: `Order ${params.id}`,
  };
};

const OrderDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <OrderDetails
      paypalClientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}
      orderId={params.id}
    />
  );
};

export default OrderDetailsPage;
