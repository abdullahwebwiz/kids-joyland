'use client';

import Link from 'next/link';
import useSWR from 'swr';

import { Order } from '@/lib/models/OrderModel';
import { downloadCSV } from '@/lib/csvDownload';
import { Download } from 'lucide-react';

export default function Orders() {
  const { data: orders, error, isLoading } = useSWR(`/api/admin/orders`);

  if (error) return 'An error has occurred.';
  if (isLoading) return 'Loading...';

  return (
    <div>
      <h1 className='py-4 text-2xl'>Orders</h1>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order._id}>
                <td>..{order._id.substring(20, 24)}</td>
                <td>{order.user?.name || 'Deleted user'}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>{order.isPaid ? `Paid` : 'not paid'}</td>
                <td>
                  {order.isDelivered && order.deliveredAt
                    ? `${order.deliveredAt.substring(0, 10)}`
                    : 'not delivered'}
                </td>
                <td>
                  <Link href={`/order/${order._id}`} passHref>
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className='w-half btn btn-primary mx-2'
          type='button'
          onClick={() => {
            const currentDate = new Date();
            const options: any = {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            };
            const formattedDate = currentDate.toLocaleDateString(
              'en-US',
              options,
            );
            downloadCSV(orders, 'orders_' + formattedDate + '.csv');
          }}
        >
          <Download />
          Download CSV
        </button>
      </div>
    </div>
  );
}
