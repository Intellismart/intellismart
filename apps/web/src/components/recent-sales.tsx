'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';

type Sale = {
  id: string;
  name: string;
  email: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  avatar: string;
};

export function RecentSales() {
  // Mock data - replace with actual data fetching
  // Using placeholder avatars from ui-avatars.com
  const sales: Sale[] = [
    {
      id: '1',
      name: 'Olivia Martin',
      email: 'olivia.martin@email.com',
      amount: '$1,999.00',
      status: 'completed',
      avatar: 'https://ui-avatars.com/api/?name=Olivia+Martin&background=random',
    },
    {
      id: '2',
      name: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      amount: '$39.00',
      status: 'completed',
      avatar: 'https://ui-avatars.com/api/?name=Jackson+Lee&background=random',
    },
    {
      id: '3',
      name: 'Isabella Nguyen',
      email: 'isabella.nguyen@email.com',
      amount: '$299.00',
      status: 'pending',
      avatar: 'https://ui-avatars.com/api/?name=Isabella+Nguyen&background=random',
    },
    {
      id: '4',
      name: 'William Kim',
      email: 'will@email.com',
      amount: '$99.00',
      status: 'completed',
      avatar: 'https://ui-avatars.com/api/?name=William+Kim&background=random',
    },
    {
      id: '5',
      name: 'Sofia Davis',
      email: 'sofia.davis@email.com',
      amount: '$79.00',
      status: 'failed',
      avatar: 'https://ui-avatars.com/api/?name=Sofia+Davis&background=random',
    },
  ];

  const getStatusIcon = (status: Sale['status']) => {
    switch (status) {
      case 'completed':
        return <span className="h-4 w-4 text-green-500"><Icons.checkCircle /></span>;
      case 'pending':
        return <span className="h-4 w-4 text-yellow-500"><Icons.clock /></span>;
      case 'failed':
        return <span className="h-4 w-4 text-red-500"><Icons.x /></span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.avatar} alt={sale.name} />
            <AvatarFallback>{sale.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <span className="font-medium">{sale.amount}</span>
            {getStatusIcon(sale.status)}
          </div>
        </div>
      ))}
    </div>
  );
}
