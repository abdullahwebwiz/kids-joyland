import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';

export const POST = auth(async (...request: any) => {
  const [req, { params }] = request;
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const order = await OrderModel.findById(params.id);
  console.log('lahore');
  console.log(params);
  if (order) {
    try {
      order.isPaid = true;
      order.paidAt = Date.now();
      const updatedOrder = await order.save();
      return Response.json(updatedOrder);
    } catch (err: any) {
      console.log(err);
      return Response.json(
        { message: err.message },
        {
          status: 500,
        },
      );
    }
  } else {
    return Response.json(
      { message: 'Order not found' },
      {
        status: 404,
      },
    );
  }
});
