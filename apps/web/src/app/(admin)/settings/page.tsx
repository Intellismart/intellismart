'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Icons } from '@/components/icons';

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState('IntelliSMART');
  const [storeEmail, setStoreEmail] = useState('contact@intellismart.com');
  const [storePhone, setStorePhone] = useState('+1 (555) 123-4567');
  const [storeAddress, setStoreAddress] = useState('123 Tech Street, Sydney NSW 2000, Australia');
  const [currency, setCurrency] = useState('AUD');
  const [timezone, setTimezone] = useState('Australia/Sydney');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  const currencies = [
    { value: 'AUD', label: 'Australian Dollar (A$)' },
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
  ];
  
  const timezones = [
    { value: 'Australia/Sydney', label: 'Sydney, Australia (AEST)' },
    { value: 'America/New_York', label: 'New York, USA (EST)' },
    { value: 'Europe/London', label: 'London, UK (GMT)' },
    { value: 'Asia/Tokyo', label: 'Tokyo, Japan (JST)' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Settings saved');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your store's settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="taxes">Taxes</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit}>
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>
                  Update your store's basic information and contact details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input 
                      id="store-name" 
                      value={storeName} 
                      onChange={(e) => setStoreName(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Contact Email</Label>
                    <Input 
                      id="store-email" 
                      type="email" 
                      value={storeEmail} 
                      onChange={(e) => setStoreEmail(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-phone">Phone Number</Label>
                    <Input 
                      id="store-phone" 
                      value={storePhone} 
                      onChange={(e) => setStorePhone(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-address">Address</Label>
                    <Input 
                      id="store-address" 
                      value={storeAddress} 
                      onChange={(e) => setStoreAddress(e.target.value)} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Store Preferences</CardTitle>
                <CardDescription>
                  Configure your store's default settings and behavior.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <select
                      id="currency"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      {currencies.map((curr) => (
                        <option key={curr.value} value={curr.value}>
                          {curr.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      {timezones.map((tz) => (
                        <option key={tz.value} value={tz.value}>
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-4">
                  <Switch 
                    id="maintenance-mode" 
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  When enabled, your store will be in maintenance mode and only administrators will be able to access it.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="notifications-enabled">Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important updates and alerts.
                    </p>
                  </div>
                  <Switch 
                    id="notifications-enabled" 
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email.
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive browser notifications.
                      </p>
                    </div>
                    <Switch 
                      id="push-notifications" 
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>
                  Customize the email templates sent to your customers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Order Confirmation</Label>
                  <p className="text-sm text-muted-foreground">
                    Sent when a customer places an order.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Icons.edit className="mr-2 h-4 w-4" />
                    Edit Template
                  </Button>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Label>Shipping Confirmation</Label>
                  <p className="text-sm text-muted-foreground">
                    Sent when an order is shipped.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Icons.edit className="mr-2 h-4 w-4" />
                    Edit Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <Card className="mt-6">
            <CardFooter className="flex justify-end space-x-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">
                <Icons.save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Tabs>
    </div>
  );
}
