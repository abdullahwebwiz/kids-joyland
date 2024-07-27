import { Metadata } from 'next';
import dynamic from 'next/dynamic';
const CartDetails = dynamic(() => import('./CartDetails'));
export const metadata: Metadata = {
  title: 'Shopping Cart',
};

const CartPage = () => {
  return (
    <div>
      <CartDetails />
    </div>
  );
};

export default CartPage;
