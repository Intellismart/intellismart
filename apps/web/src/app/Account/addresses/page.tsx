'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { AddressForm } from '@/components/address-form';
import { Address } from '@/types';

// Mock addresses data - replace with actual API calls
const mockAddresses: Address[] = [
  {
    id: '1',
    type: 'shipping',
    firstName: 'John',
    lastName: 'Doe',
    company: 'Acme Inc',
    address1: '123 Main St',
    address2: 'Apt 4B',
    city: 'Sydney',
    state: 'NSW',
    postcode: '2000',
    country: 'Australia',
    phone: '+61 2 1234 5678',
    isDefault: true,
  },
  {
    id: '2',
    type: 'billing',
    firstName: 'John',
    lastName: 'Doe',
    company: 'Acme Inc',
    address1: '456 Business Ave',
    address2: 'Level 5',
    city: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    country: 'Australia',
    phone: '+61 3 9876 5432',
    isDefault: true,
  },
];

export default function AddressesPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/account/addresses');
    },
  });
  
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const shippingAddresses = addresses.filter(addr => addr.type === 'shipping');
  const billingAddresses = addresses.filter(addr => addr.type === 'billing');
  
  const handleSaveAddress = (address: Address) => {
    if (isEditing) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === isEditing ? { ...address, id: isEditing } : addr
      ));
      setIsEditing(null);
    } else {
      // Add new address
      setAddresses([...addresses, { ...address, id: Date.now().toString() }]);
      setIsAdding(false);
    }
  };
  
  const handleDeleteAddress = (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };
  
  const handleSetDefault = (id: string, type: 'shipping' | 'billing') => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id ? true : 
                (addr.type === type ? false : addr.isDefault)
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
                <Button variant="ghost" className="w-full justify-start bg-accent" asChild>
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
            <h1 className="text-2xl font-bold">My Addresses</h1>
          </div>
          
          {/* Shipping Addresses */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Shipping Addresses</CardTitle>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setIsAdding(true);
                  setIsEditing(null);
                }}
              >
                <Icons.plus className="mr-2 h-4 w-4" />
                Add Shipping Address
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {isAdding && (
                <div className="border rounded-lg p-4 bg-muted/20">
                  <h3 className="font-medium mb-4">Add New Shipping Address</h3>
                  <AddressForm 
                    type="shipping"
                    onSave={handleSaveAddress}
                    onCancel={() => setIsAdding(false)}
                  />
                </div>
              )}
              
              {shippingAddresses.length === 0 && !isAdding ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Icons.mapPin className="mx-auto h-8 w-8 mb-2" />
                  <p>No shipping addresses saved</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {shippingAddresses.map((address) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      isEditing={isEditing === address.id}
                      onEdit={() => setIsEditing(address.id)}
                      onSave={handleSaveAddress}
                      onCancel={() => setIsEditing(null)}
                      onDelete={handleDeleteAddress}
                      onSetDefault={handleSetDefault}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Billing Addresses */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Billing Addresses</CardTitle>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setIsAdding(true);
                  setIsEditing(null);
                }}
              >
                <Icons.plus className="mr-2 h-4 w-4" />
                Add Billing Address
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {isAdding && (
                <div className="border rounded-lg p-4 bg-muted/20">
                  <h3 className="font-medium mb-4">Add New Billing Address</h3>
                  <AddressForm 
                    type="billing"
                    onSave={handleSaveAddress}
                    onCancel={() => setIsAdding(false)}
                  />
                </div>
              )}
              
              {billingAddresses.length === 0 && !isAdding ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Icons.creditCard className="mx-auto h-8 w-8 mb-2" />
                  <p>No billing addresses saved</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {billingAddresses.map((address) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      isEditing={isEditing === address.id}
                      onEdit={() => setIsEditing(address.id)}
                      onSave={handleSaveAddress}
                      onCancel={() => setIsEditing(null)}
                      onDelete={handleDeleteAddress}
                      onSetDefault={handleSetDefault}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Address Card Component
function AddressCard({
  address,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onSetDefault,
}: {
  address: Address;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (address: Address) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string, type: 'shipping' | 'billing') => void;
}) {
  if (isEditing) {
    return (
      <div className="border rounded-lg p-4 bg-muted/20">
        <h3 className="font-medium mb-4">Edit {address.type} Address</h3>
        <AddressForm
          address={address}
          type={address.type as 'shipping' | 'billing'}
          onSave={onSave}
          onCancel={onCancel}
        />
      </div>
    );
  }

  return (
    <div className={`border rounded-lg p-4 ${address.isDefault ? 'border-primary' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">
            {address.firstName} {address.lastName}
            {address.isDefault && (
              <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                Default
              </span>
            )}
          </h3>
          <p className="text-sm text-muted-foreground">
            {address.company && <>{address.company}<br /></>}
            {address.address1}<br />
            {address.address2 && <>{address.address2}<br /></>}
            {address.city}, {address.state} {address.postcode}<br />
            {address.country}<br />
            {address.phone && <>{address.phone}<br /></>}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={onEdit}
          >
            <Icons.edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => onDelete(address.id)}
          >
            <Icons.trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
      {!address.isDefault && (
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onSetDefault(address.id, address.type as 'shipping' | 'billing')}
          >
            Set as Default
          </Button>
        </div>
      )}
    </div>
  );
}

// Add this import at the top of the file
import { redirect } from 'next/navigation';
import Link from 'next/link';
