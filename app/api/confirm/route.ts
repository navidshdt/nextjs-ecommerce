import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import ZarinPal from 'zarinpal-node-sdk';
import db from '@/utils/db';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const authority = searchParams.get('Authority');
  const status = searchParams.get('Status');

  if (!authority || status !== 'OK') {
    redirect('/orders?error=payment_cancelled');
  }

  const order = await db.order.findFirst({ where: { authority } });

  if (!order) {
    redirect('/orders?error=order_not_found');
  }

  const zarinpal = new ZarinPal({
    merchantId: process.env.ZARINPAL_MERCHANT_ID as string,
    sandbox: true,
  });

  try {
    const response = await zarinpal.verifications.verify({
      amount: order.orderTotal, // Must match the amount when created
      authority: authority,
    });

    // code 100 = first verification successful; 101 = already verified (idempotent)
    if (response.data?.code === 100 || response.data?.code === 101) {
      await db.order.update({
        where: { id: order.id },
        data: { isPaid: true, refId: String(response.data.ref_id) },
      });

      const cart = await db.cart.findFirst({
        where: { clerkId: order.clerkId },
      });
      if (cart) {
        await db.cart.delete({ where: { id: cart.id } });
      }

      redirect('/orders');
    } else {
      redirect('/orders?error=verification_failed');
    }
  } catch (err) {
    console.log(err);
    redirect('/orders?error=verification_error');
  }
};
