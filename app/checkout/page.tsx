'use client';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const cartId = searchParams.get('cartId');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId || !cartId) return;

    const startPayment = async () => {
      try {
        const response = await axios.post('/api/payment', { orderId, cartId });
        if (response.data.url) {
          window.location.href = response.data.url; // Redirect to ZarinPal
        } else {
          setError(response.data.error || 'Payment failed');
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      }
    };

    startPayment();
  }, [orderId, cartId]);

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Payment Error</h2>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold">Redirecting to payment...</h2>
      <p className="text-muted-foreground mt-2">Please wait.</p>
    </div>
  );
}
