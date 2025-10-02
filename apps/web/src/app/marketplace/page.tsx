'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Filter products based on active tab and search query
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];
    
    // Filter by category
    if (activeTab !== 'all') {
      result = result.filter(product => 
        product.category.toLowerCase().includes(activeTab)
      );
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [activeTab, searchQuery]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled automatically by the filteredProducts dependency on searchQuery
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => setIsSearching(false), 300);
  };

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
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <label htmlFor="search" className="sr-only">Search for items</label>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true">
                    <Icons.search />
                  </span>
                  <input
                    id="search"
                    type="search"
                    name="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search for items"
                    placeholder="What are you looking for?"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-required="false"
                    aria-busy={isSearching ? 'true' : 'false'}
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg" 
                  className="whitespace-nowrap"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <LoadingSpinner size={16} className="mr-2" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Icons.search className="mr-2 h-4 w-4" />
                      <span>Search</span>
                    </>
                  )}
                </Button>
              </div>
              {searchQuery && (
                <div className="text-sm text-muted-foreground" aria-live="polite">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found for "{searchQuery}"
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="categories-heading" className="text-xl font-semibold">Popular Categories</h2>
          <Link href="/categories" aria-label="View all categories">
            <Button variant="ghost" size="sm" className="text-primary">
              See all categories
              <Icons.chevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
        
        <div 
          role="tablist" 
          aria-labelledby="categories-heading"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2"
        >
          {categories.map((category) => {
            const Icon = Icons[category.icon] || Icons.grid;
            const isSelected = activeTab === category.id;
            return (
              <button
                key={category.id}
                role="tab"
                id={`category-${category.id}`}
                aria-selected={isSelected}
                aria-controls={`category-${category.id}-panel`}
                onClick={() => setActiveTab(category.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
                  isSelected 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-muted/50'
                }`}
                tabIndex={isSelected ? 0 : -1}
              >
                <Icon className="h-6 w-6 mb-2" aria-hidden="true" />
                <span className="text-sm font-medium text-center">{category.name}</span>
                <span className="sr-only">, {category.count} items available</span>
                <span aria-hidden="true" className="text-xs text-muted-foreground mt-1">{category.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Listings */}
      <section aria-labelledby="listings-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold" id="listings-heading">
            {activeTab === 'all' ? 'All Listings' : `${activeTab} Listings`}
          </h2>
          
          <div className="flex items-center gap-2">
            <div 
              role="radiogroup" 
              aria-label="View mode"
              className="flex items-center space-x-1 rounded-md bg-muted p-1"
            >
              <Button
                variant="ghost"
                size="sm"
                role="radio"
                aria-checked={viewMode === 'grid'}
                className={`rounded-md px-3 ${viewMode === 'grid' ? 'bg-background shadow' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Icons.grid className="h-4 w-4" aria-hidden="true" />
                <span className="ml-2 hidden sm:inline">Grid</span>
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                role="radio"
                aria-checked={viewMode === 'list'}
                className={`rounded-md px-3 ${viewMode === 'list' ? 'bg-background shadow' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <Icons.list className="h-4 w-4" aria-hidden="true" />
                <span className="ml-2 hidden sm:inline">List</span>
                <span className="sr-only">List view</span>
              </Button>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="whitespace-nowrap"
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-label="Filter and sort options"
                >
                  <Icons.filter className="mr-2 h-4 w-4" aria-hidden="true" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56"
                role="menu"
                aria-label="Sorting options"
              >
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem role="menuitemradio" aria-checked="true">
                  Most Recent
                </DropdownMenuItem>
                <DropdownMenuItem role="menuitemradio">
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem role="menuitemradio">
                  Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem role="menuitemradio">
                  Ending Soonest
                </DropdownMenuItem>
                <DropdownMenuItem role="menuitemradio">
                  Most Watched
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <article key={product.id} className="h-full">
                <Link 
                  href={`/marketplace/item/${product.id}`} 
                  className="group block h-full"
                  aria-label={`View ${product.title} - $${product.price}`}
                >
                  <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="relative aspect-square bg-muted/50">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        aria-hidden="true"
                      />
                      {product.isFeatured && (
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="bg-primary text-primary-foreground">
                            <span className="sr-only">Featured: </span>
                            Featured
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                          <span className="sr-only">Condition: </span>
                          {product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <h3 className="text-base font-medium line-clamp-2 h-12">
                        {product.title}
                      </h3>
                      <p className="line-clamp-2 h-10 text-xs text-muted-foreground">
                        {product.description}
                      </p>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold">
                          <span className="sr-only">Price: </span>
                          ${product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            <span className="sr-only">Original price: </span>
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          <span className="sr-only">Location: </span>
                          {product.location}
                        </span>
                        <span>
                          <span className="sr-only">Time remaining: </span>
                          {product.timeLeft} left
                        </span>
                      </div>
                    </CardContent>
                    {product.isAuction && (
                      <CardFooter className="p-4 pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          <span className="sr-only">Number of bids: </span>
                          {product.bids} {product.bids === 1 ? 'Bid' : 'Bids'}
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <Link 
                  href={`/marketplace/item/${product.id}`}
                  className="block"
                  aria-label={`View ${product.title} - $${product.price}`}
                >
                  <Card className="overflow-hidden transition-shadow hover:shadow-md">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-48 h-48 bg-muted/50">
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          aria-hidden="true"
                        />
                        {product.isFeatured && (
                          <div className="absolute top-2 left-2">
                            <Badge variant="secondary" className="bg-primary text-primary-foreground">
                              <span className="sr-only">Featured: </span>
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-medium">{product.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  <span className="sr-only">Location: </span>
                                  {product.location} • 
                                  <span className="sr-only">Time remaining: </span>
                                  {product.timeLeft} left
                                </p>
                              </div>
                              <Badge variant="outline" className="ml-2">
                                <span className="sr-only">Condition: </span>
                                {product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
                              </Badge>
                            </div>
                            <p className="mt-2 text-sm line-clamp-2 text-muted-foreground">
                              {product.description}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-lg font-bold">
                              <span className="sr-only">Price: </span>
                              ${product.price.toLocaleString()}
                              {product.originalPrice && (
                                <span className="ml-2 text-sm text-muted-foreground line-through">
                                  <span className="sr-only">Original price: </span>
                                  ${product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            {product.isAuction && (
                              <Button variant="outline" size="sm">
                                <span className="sr-only">Number of bids: </span>
                                {product.bids} {product.bids === 1 ? 'Bid' : 'Bids'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )}

            <nav aria-label="Pagination" className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled
                      aria-label="Go to previous page"
                      className="gap-1"
                    >
                      <Icons.chevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                      <span className="sr-only">page</span>
                    </Button>
                  </PaginationItem>
                  
                  {[1, 2, 3, 4, 5].map((page) => (
                    <PaginationItem key={page}>
                      <Button 
                        variant={page === 1 ? 'outline' : 'ghost'}
                        size="sm"
                        className={page === 1 ? 'bg-primary/10' : ''}
                        aria-label={page === 1 ? `Current Page, Page ${page}` : `Go to page ${page}`}
                        aria-current={page === 1 ? 'page' : undefined}
                      >
                        {page}
                      </Button>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <Button 
                      variant="outline" 
                      size="sm"
                      aria-label="Go to next page"
                      className="gap-1"
                    >
                      <span>Next</span>
                      <Icons.chevronRight className="h-4 w-4" />
                      <span className="sr-only">page</span>
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </nav>
          </div>

          {/* How It Works */}
          <section aria-labelledby="how-it-works-heading" className="mt-16">
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <h2 id="how-it-works-heading" className="text-2xl font-bold mb-6">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Icons.search className="h-8 w-8 mx-auto mb-4" aria-hidden="true" />,
                    title: 'Find What You Want',
                    description: 'Search or browse through thousands of listings.'
                  },
                  {
                    icon: <Icons.gavel className="h-8 w-8 mx-auto mb-4" aria-hidden="true" />,
                    title: 'Place a Bid or Buy Now',
                    description: 'Participate in auctions or buy items directly.'
                  },
                  {
                    icon: <Icons.packageOpen className="h-8 w-8 mx-auto mb-4" aria-hidden="true" />,
                    title: 'Get It Delivered',
                    description: 'Arrange shipping or local pickup with the seller.'
                  }
                ].map((item, index) => (
                  <article key={index} className="space-y-2">
                    <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold">
                      <span className="sr-only">Step {index + 1}: </span>
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </article>
                ))}
              </div>
          </div>
        )}
      </section>

          {/* Popular Searches */}
          <section aria-labelledby="popular-searches-heading" className="mt-16">
            <h2 id="popular-searches-heading" className="text-xl font-semibold mb-4" tabIndex={-1}>Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {[
                'iPhone', 'PlayStation 5', 'MacBook Pro', 'Car', 'Apartment', 
                'Bicycle', 'Camera', 'Furniture', 'Jobs', 'Services'
              ].map((tag, index) => (
                <div key={index} role="listitem">
                  <Link 
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center rounded-md border border-input bg-background px-3 py-1 text-sm font-normal transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                    aria-label={`Search for ${tag}`}
                  >
                    {tag}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      );
    }
