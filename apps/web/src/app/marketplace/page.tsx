'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  condition: 'new' | 'used' | 'refurbished';
  category: string;
  location: string;
  timeLeft: string;
  bids?: number;
  isAuction: boolean;
  isFeatured?: boolean;
};

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro Max 256GB - Brand New Sealed',
    description: 'Brand new sealed in box. Never opened. Full warranty.',
    price: 1299,
    originalPrice: 1499,
    image: '/placeholder-phone.jpg',
    condition: 'new',
    category: 'Electronics',
    location: 'Sydney, NSW',
    timeLeft: '2d 4h',
    bids: 12,
    isAuction: true,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Samsung 55" 4K Smart TV QLED Series 7',
    description: 'Excellent condition, 1 year old. Comes with original stand and remote.',
    price: 799,
    originalPrice: 1499,
    image: '/placeholder-tv.jpg',
    condition: 'used',
    category: 'Electronics',
    location: 'Melbourne, VIC',
    timeLeft: '1d 12h',
    bids: 5,
    isAuction: true
  },
  {
    id: '3',
    title: 'Professional Camera DSLR Kit with Lenses',
    description: 'Complete kit with 18-55mm and 55-200mm lenses. Perfect for beginners.',
    price: 1299,
    image: '/placeholder-camera.jpg',
    condition: 'refurbished',
    category: 'Electronics',
    location: 'Brisbane, QLD',
    timeLeft: '3d 6h',
    bids: 8,
    isAuction: true,
    isFeatured: true
  },
  {
    id: '4',
    title: 'Designer Leather Sofa - 3 Seater',
    description: 'Luxury Italian leather sofa in excellent condition. No pets, non-smoking home.',
    price: 1200,
    originalPrice: 3500,
    image: '/placeholder-sofa.jpg',
    condition: 'used',
    category: 'Furniture',
    location: 'Perth, WA',
    timeLeft: '5d',
    isAuction: false
  },
  {
    id: '5',
    title: 'Vintage Rolex Submariner Watch',
    description: 'Authentic 1985 Rolex Submariner. Recently serviced. Includes box and papers.',
    price: 18500,
    image: '/placeholder-watch.jpg',
    condition: 'used',
    category: 'Jewelry & Watches',
    location: 'Sydney, NSW',
    timeLeft: '1d 2h',
    bids: 3,
    isAuction: true
  },
  {
    id: '6',
    title: 'Apple MacBook Pro 16" M1 Pro 1TB',
    description: '2021 model. Like new condition with AppleCare+ until 2024.',
    price: 2899,
    originalPrice: 3699,
    image: '/placeholder-laptop.jpg',
    condition: 'refurbished',
    category: 'Computers & Tablets',
    location: 'Adelaide, SA',
    timeLeft: '4h',
    bids: 15,
    isAuction: true,
    isFeatured: true
  },
  {
    id: '7',
    title: 'Canon EOS R5 Mirrorless Camera Body',
    description: 'Professional full-frame mirrorless camera. Low shutter count.',
    price: 4299,
    image: '/placeholder-camera2.jpg',
    condition: 'used',
    category: 'Electronics',
    location: 'Melbourne, VIC',
    timeLeft: '2d 8h',
    bids: 7,
    isAuction: true
  },
  {
    id: '8',
    title: 'DJI Mavic 3 Pro Drone with Fly More Combo',
    description: 'Like new condition. Flown only 3 times. Includes all original accessories.',
    price: 3499,
    originalPrice: 4199,
    image: '/placeholder-drone.jpg',
    condition: 'used',
    category: 'Drones & Accessories',
    location: 'Brisbane, QLD',
    timeLeft: '1d 6h',
    isAuction: false
  }
];

type Category = {
  id: string;
  name: string;
  icon: keyof typeof Icons;
  count: number;
};

const categories: Category[] = [
  { id: 'all', name: 'All Categories', icon: 'grid', count: 1245 },
  { id: 'vehicles', name: 'Vehicles', icon: 'car', count: 342 },
  { id: 'property', name: 'Property', icon: 'home', count: 189 },
  { id: 'electronics', name: 'Electronics', icon: 'smartphone', count: 456 },
  { id: 'fashion', name: 'Fashion', icon: 'shirt', count: 567 },
  { id: 'home', name: 'Home & Garden', icon: 'sofa', count: 321 },
  { id: 'jobs', name: 'Jobs', icon: 'briefcase', count: 234 },
  { id: 'services', name: 'Services', icon: 'wrench', count: 178 },
];

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const filteredProducts = activeTab === 'all' 
    ? mockProducts 
    : mockProducts.filter(product => product.category.toLowerCase().includes(activeTab));

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Find Great Deals on New & Used Goods
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Buy and sell everything from used cars to mobile phones and computers, or search for property, jobs and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground">
                  <Icons.search />
                </span>
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button size="lg" className="whitespace-nowrap">
                <span className="mr-2 h-4 w-4">
                  <Icons.search />
                </span>
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Popular Categories</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            See all categories
            <Icons.chevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {categories.map((category) => {
            const Icon = Icons[category.icon] || Icons.grid;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
                  activeTab === category.id 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <Icon className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium text-center">{category.name}</span>
                <span className="text-xs text-muted-foreground mt-1">{category.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Listings */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">
            {activeTab === 'all' ? 'All Listings' : `${activeTab} Listings`}
          </h2>
          
          <div className="flex items-center gap-2
          ">
            <div className="flex items-center space-x-1 rounded-md bg-muted p-1">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-md px-3 ${viewMode === 'grid' ? 'bg-background shadow' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Icons.grid className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Grid</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-md px-3 ${viewMode === 'list' ? 'bg-background shadow' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <Icons.list className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">List</span>
              </Button>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="whitespace-nowrap">
                  <Icons.filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Most Recent</DropdownMenuItem>
                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem>Ending Soonest</DropdownMenuItem>
                <DropdownMenuItem>Most Watched</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/marketplace/item/${product.id}`} className="group">
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="relative aspect-square bg-muted/50">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {product.isFeatured && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                        {product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base font-medium line-clamp-2 h-12">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 h-10 text-xs">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold">${product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{product.location}</span>
                      <span>{product.timeLeft} left</span>
                    </div>
                  </CardContent>
                  {product.isAuction && (
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        {product.bids} {product.bids === 1 ? 'Bid' : 'Bids'}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/marketplace/item/${product.id}`}>
                <Card className="overflow-hidden transition-shadow hover:shadow-md">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-48 h-48 bg-muted/50">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 192px"
                      />
                      {product.isFeatured && (
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="bg-primary text-primary-foreground">
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex flex-col h-full">
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <h3 className="text-lg font-medium line-clamp-2">
                                  {product.title}
                                </h3>
                                <Badge variant="outline" className="ml-2 flex-shrink-0">
                                  {product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
                                </Badge>
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                {product.description}
                              </p>
                            </div>
                            <div className="mt-4">
                              <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold">${product.price.toLocaleString()}</span>
                                {product.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${product.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Icons.mapPin className="h-4 w-4" />
                                  <span>{product.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Icons.clock className="h-4 w-4" />
                                  <span>{product.timeLeft} left</span>
                                </div>
                                {product.isAuction && (
                                  <div className="flex items-center gap-2">
                                    <Icons.gavel className="h-4 w-4" />
                                    <span>{product.bids} {product.bids === 1 ? 'Bid' : 'Bids'}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button variant="outline" size="sm" disabled>
                      <Icons.chevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button variant="outline" size="sm" className="bg-primary/10">
                      1
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button variant="ghost" size="sm">
                      2
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button variant="ghost" size="sm">
                      3
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button variant="ghost" size="sm" className="hidden sm:flex">
                      4
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button variant="ghost" size="sm" className="hidden sm:flex">
                      5
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button variant="outline" size="sm">
                      Next
                      <Icons.chevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16 bg-muted/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Icons.search className="h-8 w-8 mx-auto mb-4" />,
                  title: '1. Find What You Want',
                  description: 'Search or browse through thousands of listings.'
                },
                {
                  icon: <Icons.gavel className="h-8 w-8 mx-auto mb-4" />,
                  title: '2. Place a Bid or Buy Now',
                  description: 'Participate in auctions or buy items directly.'
                },
                {
                  icon: <Icons.packageOpen className="h-8 w-8 mx-auto mb-4" />,
                  title: '3. Get It Delivered',
                  description: 'Arrange shipping or local pickup with the seller.'
                }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-16">
            <h2 className="text-xl font-semibold mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {[
                'iPhone', 'PlayStation 5', 'MacBook Pro', 'Car', 'Apartment', 
                'Bicycle', 'Camera', 'Furniture', 'Jobs', 'Services'
              ].map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="px-3 py-1 text-sm font-normal cursor-pointer hover:bg-primary/10"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      );
    }
