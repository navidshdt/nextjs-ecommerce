import { NextRequest } from 'next/server';
import ZarinPal from 'zarinpal-node-sdk';
import db from '@/utils/db';

export const POST = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get('origin');

  const { orderId, cartId } = await req.json();

  const order = await db.order.findUnique({ where: { id: orderId } });
  const cart = await db.cart.findUnique({
    where: { id: cartId },
    include: { cartItems: { include: { product: true } } },
  });

  if (!order || !cart) {
    return Response.json(null, { status: 404, statusText: 'Not Found' });
  }

  const zarinpal = new ZarinPal({
    merchantId: process.env.ZARINPAL_MERCHANT_ID as string,
    sandbox: true, // Set to false in production
  });

  try {
    const response = await zarinpal.payments.create({
      amount: cart.orderTotal * 10, // Convert Toman to Rial
      callback_url: `${origin}/api/confirm`,
      description: `Order ${orderId}`,
    });

    // Official SDK response structure: response.data.authority
    if (response.data?.authority) {
      await db.order.update({
        where: { id: orderId },
        data: { authority: response.data.authority },
      });

      const redirectUrl = zarinpal.payments.getRedirectUrl(
        response.data.authority,
      );
      return Response.json({ url: redirectUrl });
    } else {
      return Response.json(
        { error: 'ZarinPal request failed' },
        { status: 400 },
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};
