import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { OrderItem, ShippingAddress } from '../models/OrderModel';
import { round2 } from '../utils';

type Cart = {
  items: OrderItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;

  paymentMethod: string;
  shippingAddress: ShippingAddress;
};
let x: any = process.env.NEXT_PUBLIC_TAX_PRICE;
let xx = parseInt(x);
const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  paymentMethod: 'PayPal',
  shippingAddress: {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  },
};

export const cartStore = create<Cart>()(
  persist(() => initialState, {
    name: 'cartStore',
  }),
);

const useCartService = () => {
  const {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
  } = cartStore();

  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
    increase: (item: OrderItem) => {
      const exist = items.find((x) => x.slug === item.slug);

      const updatedCartItems = exist
        ? items.map((x) =>
            x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x,
          )
        : [...items, { ...item, qty: 1 }];

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    decrease: (item: OrderItem) => {
      const exist = items.find((x) => x.slug === item.slug);
      if (!exist) return;

      const updatedCartItems =
        exist.qty === 1
          ? items.filter((x) => x.slug !== item.slug)
          : items.map((x) =>
              x.slug === item.slug ? { ...exist, qty: exist.qty - 1 } : x,
            );

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    saveShippingAddress: (shippingAddress: ShippingAddress) => {
      cartStore.setState({
        shippingAddress,
      });
    },
    savePaymentMethod: (paymentMethod: string) => {
      cartStore.setState({
        paymentMethod,
      });
    },
    clear: () => {
      cartStore.setState({
        items: [],
      });
    },
    init: () => cartStore.setState(initialState),
  };
};

export default useCartService;

export const calcPrice = (items: OrderItem[]) => {
  const x1: any = process.env.NEXT_PUBLIC_SHIPPING_PRICE;
  const x2: any = process.env.NEXT_PUBLIC_TAX_PRICE;
  const y1 = parseInt(x1);
  const y2 = parseInt(x2);

  const itemsPrice = round2(
      items.reduce((acc, item) => acc + item.price * item.qty, 0),
    ),
    shippingPrice = y1,
    taxPrice = y2,
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
