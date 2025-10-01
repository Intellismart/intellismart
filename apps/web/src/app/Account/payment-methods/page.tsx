'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { AddPaymentMethodDialog } from '@/components/add-payment-method-dialog';

type PaymentMethod = {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  brand?: string;
  expiry?: string;
  isDefault: boolean;
  name?: string;
};

// Mock payment methods data - replace with actual API calls
const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    brand: 'Visa',
    last4: '4242',
    expiry: '12/25',
    isDefault: true,
    name: 'John Doe',
  },
  {
    id: '2',
    type: 'card',
    brand: 'Mastercard',
    last4: '5555',
    expiry: '06/24',
    isDefault: false,
    name: 'John Doe',
  },
  {
    id: '3',
    type: 'paypal',
    isDefault: false,
    name: 'john.doe@example.com',
  },
];

export default function PaymentMethodsPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/account/payment-methods');
    },
  });
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  
  const handleAddPaymentMethod = (method: Omit<PaymentMethod, 'id' | 'isDefault'>) => {
    // In a real app, this would be an API call to your payment processor
    const newMethod: PaymentMethod = {
      ...method,
      id: Date.now().toString(),
      isDefault: paymentMethods.length === 0, // Set as default if first method
    };
    
    setPaymentMethods([...paymentMethods, newMethod]);
    setIsAddDialogOpen(false);
  };
  
  const handleDeletePaymentMethod = async (id: string) => {
    try {
      setIsDeleting(id);
      // In a real app, this would be an API call to your payment processor
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    } catch (error) {
      console.error('Failed to delete payment method:', error);
    } finally {
      setIsDeleting(null);
    }
  };
  
  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id,
    })));
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-4 md:grid-cols-4">
        {/* Sidebar Navigation */}
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
                <Button variant="ghost" className="w-full justify-start" asChild>
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
                <Button variant="ghost" className="w-full justify-start bg-accent" asChild>
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
            <div>
              <h1 className="text-2xl font-bold">Payment Methods</h1>
              <p className="text-sm text-muted-foreground">
                Manage your saved payment methods for faster checkout.
              </p>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Icons.plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </div>
          
          {paymentMethods.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Icons.creditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground">No payment methods saved</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add a payment method for faster checkout.
                </p>
                <div className="mt-6">
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Icons.plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {paymentMethods.map((method) => (
                <Card key={method.id} className="overflow-hidden">
                  <div className="flex items-center p-4">
                    <div className="flex-shrink-0 mr-4">
                      {method.type === 'card' && (
                        <div className="h-10 w-16 rounded-md bg-muted flex items-center justify-center">
                          {method.brand === 'Visa' && <Icons.visa className="h-6 w-10" />}
                          {method.brand === 'Mastercard' && <Icons.mastercard className="h-6 w-10" />}
                          {!['Visa', 'Mastercard'].includes(method.brand || '') && (
                            <Icons.creditCard className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                      )}
                      {method.type === 'paypal' && (
                        <div className="h-10 w-16 rounded-md bg-muted flex items-center justify-center">
                          <Icons.paypal className="h-6 w-10" />
                        </div>
                      )}
                      {method.type === 'bank' && (
                        <div className="h-10 w-16 rounded-md bg-muted flex items-center justify-center">
                          <Icons.bank className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <h4 className="font-medium truncate">
                          {method.type === 'card' && (
                            <>
                              {method.brand} •••• {method.last4}
                            </>
                          )}
                          {method.type === 'paypal' && (
                            <>PayPal: {method.name}</>
                          )}
                          {method.type === 'bank' && (
                            <>Bank Account •••• {method.last4}</>
                          )}
                        </h4>
                        {method.isDefault && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                            Default
                          </span>
                        )}
                      </div>
                      
                      {method.type === 'card' && method.expiry && (
                        <p className="text-sm text-muted-foreground">
                          Expires {method.expiry} • {method.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {!method.isDefault && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleSetDefault(method.id)}
                          disabled={isDeleting === method.id}
                        >
                          Set as Default
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeletePaymentMethod(method.id)}
                        disabled={isDeleting === method.id}
                      >
                        {isDeleting === method.id ? (
                          <Icons.spinner className="h-4 w-4 animate-spin" />
                        ) : (
                          <Icons.trash className="h-4 w-4" />
                        )}
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          <div className="text-sm text-muted-foreground">
            <p>Your payment information is encrypted and secure. We don't store your full card details.</p>
          </div>
        </div>
      </div>
      
      <AddPaymentMethodDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onSave={handleAddPaymentMethod}
      />
    </div>
  );
}

// Add this import at the top of the file
import { redirect } from 'next/navigation';
import Link from 'next/link';
