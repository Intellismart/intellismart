'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { wooCommerceService } from '@/lib/woocommerce';

type Order = {
  id: number;
  number: string;
  status: string;
  date_created: string;
  total: string;
  payment_method_title: string;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  line_items: Array<{
    id: number;
    name: string;
    product_id: number;
    quantity: number;
    subtotal: string;
    total: string;
    sku: string;
    meta_data: Array<{
      id: number;
      key: string;
      value: string;
    }>;
  }>;
  shipping_lines: Array<{
    method_title: string;
    total: string;
  }>;
  fee_lines: Array<{
    name: string;
    total: string;
  }>;
  coupon_lines: Array<{
    code: string;
    discount: string;
  }>;
};

export default function OrderReceivedPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const orderId = Array.isArray(params.id) ? params.id[0] : params.id;
        const data = await wooCommerceService.getOrder(parseInt(orderId));
        setOrder(data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchOrder();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const orderDate = new Date(order.date_created).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Order Confirmed!
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Thank you for your purchase, {order.billing.first_name}!
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Order #{order.number} was placed on {orderDate} and is currently{' '}
            <span className="font-medium text-gray-900">{order.status}</span>.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            We've sent a confirmation email to {order.billing.email}.
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Order Details</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Review your order information below.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Order number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  #{order.number}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Date placed</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {orderDate}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Payment method</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.payment_method_title}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Order status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Order Items</h2>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {order.line_items.map((item) => (
                <li key={item.id} className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                      {/* Product image would go here */}
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        <svg
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="ml-4 text-sm font-medium text-gray-900">
                          ${parseFloat(item.total).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      {item.sku && (
                        <p className="mt-1 text-sm text-gray-500">SKU: {item.sku}</p>
                      )}
                      {item.meta_data && item.meta_data.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {item.meta_data.map((meta) => (
                            <p key={meta.id} className="text-xs text-gray-500">
                              {meta.key}: {meta.value}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${parseFloat(order.total).toFixed(2)}</p>
            </div>
            {order.shipping_lines.map((shipping, index) => (
              <div key={index} className="flex justify-between text-sm text-gray-500 mt-2">
                <p>Shipping ({shipping.method_title})</p>
                <p>${parseFloat(shipping.total).toFixed(2)}</p>
              </div>
            ))}
            {order.fee_lines.map((fee, index) => (
              <div key={`fee-${index}`} className="flex justify-between text-sm text-gray-500 mt-2">
                <p>{fee.name}</p>
                <p>${parseFloat(fee.total).toFixed(2)}</p>
              </div>
            ))}
            {order.coupon_lines.map((coupon, index) => (
              <div key={`coupon-${index}`} className="flex justify-between text-sm text-green-700 mt-2">
                <p>Discount ({coupon.code})</p>
                <p>-${Math.abs(parseFloat(coupon.discount)).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between text-base font-medium text-gray-900 mt-4 pt-4 border-t border-gray-200">
              <p>Total</p>
              <p>${parseFloat(order.total).toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Customer Information</h2>
          </div>
          <div className="px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Contact information</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.billing.email}
                  <br />
                  {order.billing.phone}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Billing address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.billing.first_name} {order.billing.last_name}
                  <br />
                  {order.billing.address_1}
                  {order.billing.address_2 && (
                    <>
                      <br />
                      {order.billing.address_2}
                    </>
                  )}
                  <br />
                  {order.billing.city}, {order.billing.state} {order.billing.postcode}
                  <br />
                  {order.billing.country}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Shipping address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.shipping.first_name} {order.shipping.last_name}
                  <br />
                  {order.shipping.address_1}
                  {order.shipping.address_2 && (
                    <>
                      <br />
                      {order.shipping.address_2}
                    </>
                  )}
                  <br />
                  {order.shipping.city}, {order.shipping.state} {order.shipping.postcode}
                  <br />
                  {order.shipping.country}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Payment method</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.payment_method_title}
                  <p className="mt-1 text-xs text-gray-500">
                    Your order is currently being processed. You'll receive an email confirmation when your order is ready.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold"
          >
            Continue Shopping
          </Link>
          <Link
            href="/account/orders"
            className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
}
