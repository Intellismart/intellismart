import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';

type Order = {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
};

// Mock data - replace with actual data fetching
const orders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    date: '2023-10-01',
    total: 149.98,
    status: 'processing',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    date: '2023-10-02',
    total: 299.97,
    status: 'shipped',
  },
  {
    id: 'ORD-003',
    customer: 'Bob Johnson',
    date: '2023-10-03',
    total: 99.99,
    status: 'pending',
  },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:items-center">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Icons.search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8 sm:w-[300px]"
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <DataTable columns={columns} data={orders} />
      </div>
    </div>
  );
}
