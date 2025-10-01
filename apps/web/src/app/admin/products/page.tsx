import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'archived';
};

// Mock data - replace with actual data fetching
const products: Product[] = [
  {
    id: '1',
    name: 'Premium AI Assistant',
    category: 'AI Agents',
    price: 99.99,
    stock: 50,
    status: 'active',
  },
  {
    id: '2',
    name: 'E-commerce Template',
    category: 'Templates',
    price: 49.99,
    stock: 100,
    status: 'active',
  },
  {
    id: '3',
    name: 'SEO Optimization Tool',
    category: 'Marketing',
    price: 29.99,
    stock: 0,
    status: 'draft',
  },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:items-center">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Icons.search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px]"
            />
          </div>
          <Button>
            <Icons.plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
}
