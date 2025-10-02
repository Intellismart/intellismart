import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '@/components/icons';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your store settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="taxes">Taxes</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="store-name">Store Name</Label>
              <Input id="store-name" defaultValue="IntelliSMART" />
              <p className="text-sm text-muted-foreground">
                This is the name of your store as it will appear to customers.
              </p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="store-description">Store Description</Label>
              <textarea
                id="store-description"
                name="store-description"
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue="AI-powered business solutions for the modern enterprise."
                aria-describedby="store-description-help"
                placeholder="Enter store description"
                aria-label="Store description"
              />
              <p id="store-description-help" className="text-sm text-muted-foreground">
                A brief description of your store.
              </p>
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                name="timezone"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue="UTC"
                aria-label="Select timezone"
                aria-required="true"
              >
                <option value="GMT-12">(GMT-12:00) International Date Line West</option>
                <option value="GMT-11">(GMT-11:00) Midway Island, Samoa</option>
                <option value="GMT-10">(GMT-10:00) Hawaii</option>
                <option value="GMT-8">(GMT-08:00) Pacific Time (US & Canada)</option>
                <option value="GMT-6">(GMT-06:00) Central Time (US & Canada)</option>
                <option value="GMT-5">(GMT-05:00) Eastern Time (US & Canada)</option>
                <option value="GMT">(GMT) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
                <option value="GMT+1">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                <option value="GMT+2">(GMT+02:00) Athens, Bucharest, Istanbul</option>
                <option value="GMT+8" selected>(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
                <option value="GMT+9">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                <option value="GMT+10">(GMT+10:00) Brisbane, Canberra, Melbourne, Sydney</option>
              </select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="date-format">Date Format</Label>
              <select
                id="date-format"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue="MM/DD/YYYY"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="MMM D, YYYY">MMM D, YYYY</option>
                <option value="MMMM D, YYYY">MMMM D, YYYY</option>
              </select>
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="store" className="space-y-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="currency">Currency</Label>
              <select
                id="currency"
                name="currency"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue="USD"
                aria-label="Select currency"
              >
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
                <option value="JPY">Japanese Yen (JPY)</option>
                <option value="AUD">Australian Dollar (AUD)</option>
                <option value="CAD">Canadian Dollar (CAD)</option>
                <option value="CNY">Chinese Yuan (CNY)</option>
                <option value="INR">Indian Rupee (INR)</option>
                <option value="SGD">Singapore Dollar (SGD)</option>
              </select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="weight-unit">Weight Unit</Label>
              <select
                id="weight-unit"
                name="weight-unit"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue="kg"
                aria-label="Select weight unit"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="lb">Pounds (lb)</option>
                <option value="oz">Ounces (oz)</option>
              </select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="dimension-unit">Dimension Unit</Label>
              <select
                id="dimension-unit"
                name="dimension-unit"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue="cm"
                aria-label="Select dimension unit"
              >
                <option value="cm">Centimeters (cm)</option>
                <option value="m">Meters (m)</option>
                <option value="in">Inches (in)</option>
                <option value="ft">Feet (ft)</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="inventory-management"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                defaultChecked
              />
              <label
                htmlFor="inventory-management"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Enable inventory management
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="reviews"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                defaultChecked
              />
              <label
                htmlFor="reviews"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Enable product reviews
              </label>
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shipping">
          <div className="flex h-[200px] items-center justify-center rounded-md border-2 border-dashed">
            <p className="text-sm text-muted-foreground">Shipping settings will be available soon</p>
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <div className="flex h-[200px] items-center justify-center rounded-md border-2 border-dashed">
            <p className="text-sm text-muted-foreground">Payment settings will be available soon</p>
          </div>
        </TabsContent>

        <TabsContent value="taxes">
          <div className="flex h-[200px] items-center justify-center rounded-md border-2 border-dashed">
            <p className="text-sm text-muted-foreground">Tax settings will be available soon</p>
          </div>
        </TabsContent>

        <TabsContent value="email">
          <div className="flex h-[200px] items-center justify-center rounded-md border-2 border-dashed">
            <p className="text-sm text-muted-foreground">Email settings will be available soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
