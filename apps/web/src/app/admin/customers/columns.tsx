import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export type Customer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-muted mr-3">
            <Icons.user className="h-5 w-5" />
          </div>
          <div>
            <div className="font-medium">{row.getValue('name')}</div>
            <div className="text-sm text-muted-foreground">
              {row.getValue('email')}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'orders',
    header: 'Orders',
  },
  {
    accessorKey: 'totalSpent',
    header: 'Total Spent',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('totalSpent'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'lastOrder',
    header: 'Last Order',
    cell: ({ row }) => {
      const date = new Date(row.getValue('lastOrder'));
      const formatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return <div>{formatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Icons.mail className="h-4 w-4" />
            <span className="sr-only">Send Email</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Icons.eye className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Button>
        </div>
      );
    },
  },
];
