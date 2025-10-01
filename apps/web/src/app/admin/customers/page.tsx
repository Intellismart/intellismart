import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';

type Customer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
};

// Mock data - replace with actual data fetching
const customers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    orders: 5,
    totalSpent: 499.95,
    lastOrder: '2023-10-01',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    orders: 12,
    totalSpent: 1299.88,
    lastOrder: '2023-10-02',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    orders: 2,
    totalSpent: 199.98,
    lastOrder: '2023-09-28',
  },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:items-center">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Icons.search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-8 sm:w-[300px]"
            />
          </div>
          <Button>
            <Icons.plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <DataTable columns={columns} data={customers} />
      </div>
    </div>
  );
}
