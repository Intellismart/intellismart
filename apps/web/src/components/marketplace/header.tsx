'use client';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { MainNav } from '@/components/main-nav';
import { SiteHeader } from '@/components/site-header';

export function MarketplaceHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center space-x-6">
          <Link href="/marketplace" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="font-bold inline-block">IntelliSMART</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/marketplace/buy" className="transition-colors hover:text-foreground/80 text-foreground">
              Buy
            </Link>
            <Link href="/marketplace/sell" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Sell
            </Link>
            <Link href="/marketplace/jobs" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Jobs
            </Link>
            <Link href="/marketplace/services" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Services
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Icons.search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for anything..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
          </div>
          
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="relative">
              <Icons.heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Icons.bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Icons.messageSquare className="h-5 w-5" />
              <span className="sr-only">Messages</span>
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
            <Button variant="outline" className="ml-2">
              <Icons.plus className="mr-2 h-4 w-4" />
              List Item
            </Button>
            <Button variant="default" className="ml-2">
              Sign In
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
