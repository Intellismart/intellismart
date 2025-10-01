import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { OverviewChart } from '@/components/overview-chart';
import { RecentSales } from '@/components/recent-sales';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  // Mock data - replace with actual data fetching
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      description: '+20.1% from last month',
      icon: Icons.dollarSign,
    },
    {
      title: 'Orders',
      value: '+2350',
      description: '+180.1% from last month',
      icon: Icons.shoppingCart,
    },
    {
      title: 'Products',
      value: '+12,234',
      description: '+19% from last month',
      icon: Icons.package,
    },
    {
      title: 'Active Customers',
      value: '+573',
      description: '+201 since last hour',
      icon: Icons.users,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <span className="mr-2 h-4 w-4">
              <Icons.download />
            </span>
            Export
          </Button>
          <Button size="sm">
            <span className="mr-2 h-4 w-4">
              <Icons.plus />
            </span>
            Add New
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <span className="h-4 w-4 text-muted-foreground">
                  <Icon />
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <p className="text-sm text-muted-foreground">
              You made 265 sales this month.
            </p>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="h-10 w-10 rounded-md bg-muted mr-4" />
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">
                      Product Name {i}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 1000) + 100} sales
                    </p>
                  </div>
                  <div className="font-medium">
                    ${(Math.random() * 1000 + 10).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { user: 'John Doe', action: 'created a new product', time: '2 min ago' },
              { user: 'Jane Smith', action: 'updated inventory', time: '10 min ago' },
              { user: 'System', action: 'completed backup', time: '1 hour ago' },
              { user: 'Alex Johnson', action: 'processed 5 orders', time: '2 hours ago' },
              { user: 'System', action: 'scheduled maintenance', time: '3 hours ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3" />
                <div>
                  <p className="text-sm font-medium">
                    {activity.user} <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

