'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { format } from 'date-fns';

// Mock order data - replace with actual API call
type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  number: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
}

const mockOrders: Order[] = [
  {
    id: '1',
    number: 'ORD-2023-001',
    date: '2023-10-01T10:30:00Z',
    status: 'processing',
    total: 129.99,
    items: [
      {
        id: 'item-1',
        name: 'Premium AI Assistant Subscription',
        price: 99.99,
        quantity: 1,
        image: '/placeholder-product.jpg',
      },
      {
        id: 'item-2',
        name: 'Extended Warranty',
        price: 30.00,
        quantity: 1,
        image: '/placeholder-warranty.jpg',
      },
    ],
  },
  // Add more mock orders as needed
];

export default function OrdersPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/account/orders');
    },
  });

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getStatusBadge = (status: OrderStatus) => {
    const statusClasses = {
      processing: 'bg-yellow-100 text-yellow-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-4 md:grid-cols-4">
        {/* Sidebar Navigation - Same as account page */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">My Account</h2>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/account">
                    <Icons.dashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start bg-accent" asChild>
                  <Link href="/account/orders">
                    <Icons.package className="mr-2 h-4 w-4" />
                    My Orders
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/account/addresses">
                    <Icons.mapPin className="mr-2 h-4 w-4" />
                    Addresses
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/account/payment-methods">
                    <Icons.creditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/account/profile">
                    <Icons.user className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Orders</h1>
            <Button variant="outline" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>

          {mockOrders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Icons.package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/products">Start Shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {mockOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">Order #{order.number}</p>
                          <p className="text-sm font-medium">
                            {format(new Date(order.date), 'MMMM d, yyyy')}
                          </p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-0">
                    <ul className="divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <li key={item.id} className="p-6">
                          <div className="flex items-start">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{item.name}</h3>
                                  <p className="ml-4">${item.price.toFixed(2)}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                              </div>
                              <div className="mt-4 flex space-x-4">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/products/${item.id}`}>View Product</Link>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/account/orders/${order.id}`}>
                                    Track Order
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
