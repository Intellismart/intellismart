'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: Icons.dashboard,
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Icons.package,
  },
  {
    title: 'Categories',
    href: '/admin/categories',
    icon: Icons.layers,
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: Icons.shoppingCart,
  },
  {
    title: 'Customers',
    href: '/admin/customers',
    icon: Icons.users,
  },
  {
    title: 'Inventory',
    href: '/admin/inventory',
    icon: Icons.packageCheck,
  },
  {
    title: 'Discounts',
    href: '/admin/discounts',
    icon: Icons.tag,
  },
  {
    title: 'Content',
    href: '/admin/content',
    icon: Icons.fileText,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: Icons.barChart,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Icons.settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Icons.logo className="h-6 w-6" />
            <span className="text-lg">IntelliSMART</span>
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
              Admin
            </span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-3 py-2">
          <nav className="grid items-start gap-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start',
                      isActive && 'font-medium'
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t">
          <Link href="/" className="text-sm text-muted-foreground hover:underline">
            ← Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
