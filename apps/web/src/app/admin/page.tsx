import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { adminNavItems } from '@/config/admin-nav';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Sales',
      value: '$12,345',
      change: '+12% from last month',
      icon: Icons.dollarSign,
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '+8% from last month',
      icon: Icons.shoppingCart,
    },
    {
      title: 'Customers',
      value: '890',
      change: '+15% from last month',
      icon: Icons.users,
    },
    {
      title: 'Products',
      value: '567',
      change: '+5% from last month',
      icon: Icons.package,
    },
  ];

  const quickActions = [
    {
      title: 'Add Product',
      description: 'Create a new product',
      icon: Icons.plus,
      href: '/admin/products/new',
    },
    {
      title: 'View Orders',
      description: 'Manage customer orders',
      icon: Icons.shoppingBag,
      href: '/admin/orders',
    },
    {
      title: 'Analytics',
      description: 'View sales reports',
      icon: Icons.barChart,
      href: '/admin/analytics',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Icons.download className="mr-2 h-4 w-4" />
            Export
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
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
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
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Sales chart will be displayed here
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <a
                    key={i}
                    href={action.href}
                    className="flex items-center p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">{action.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
