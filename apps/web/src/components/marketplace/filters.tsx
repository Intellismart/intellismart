'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type PriceRange = [number, number];

const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home & Garden' },
  { id: 'vehicles', name: 'Vehicles' },
  { id: 'property', name: 'Property' },
  { id: 'jobs', name: 'Jobs' },
  { id: 'services', name: 'Services' },
];

const conditions = [
  { id: 'new', name: 'New' },
  { id: 'used_like_new', name: 'Used - Like New' },
  { id: 'used_good', name: 'Used - Good' },
  { id: 'used_fair', name: 'Used - Fair' },
];

interface MarketplaceFiltersProps {
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
}

export function MarketplaceFilters({ 
  mobileFiltersOpen, 
  setMobileFiltersOpen 
}: MarketplaceFiltersProps) {
  const [priceRange, setPriceRange] = useState<PriceRange>([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [location, setLocation] = useState('');

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleCondition = (conditionId: string) => {
    setSelectedConditions(prev =>
      prev.includes(conditionId)
        ? prev.filter(id => id !== conditionId)
        : [...prev, conditionId]
    );
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as PriceRange);
  };

  const resetFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedCategories([]);
    setSelectedConditions([]);
    setLocation('');
  };

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col md:flex-row items-center justify-between py-4 gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-muted-foreground">Filters:</span>
          
          {/* Category Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'h-8 px-3 text-xs',
                  selectedCategories.length > 0 && 'bg-primary/10 border-primary/30'
                )}
              >
                <Icons.layers className="mr-1 h-3.5 w-3.5" />
                Categories
                {selectedCategories.length > 0 && (
                  <span className="ml-1 text-xs font-medium">
                    ({selectedCategories.length})
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2" align="start">
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cat-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <Label htmlFor={`cat-${category.id}`} className="text-sm font-normal">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Price Range Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'h-8 px-3 text-xs',
                  (priceRange[0] > 0 || priceRange[1] < 10000) && 'bg-primary/10 border-primary/30'
                )}
              >
                <Icons.dollarSign className="mr-1 h-3.5 w-3.5" />
                Price
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Price Range</span>
                  <span className="text-sm">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={10000}
                  step={10}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  minStepsBetweenThumbs={1}
                  className="py-4"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="min-price" className="text-xs">Min</Label>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input
                        id="min-price"
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (!isNaN(value) && value <= priceRange[1]) {
                            setPriceRange([value, priceRange[1]]);
                          }
                        }}
                        className="pl-6 h-8 text-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="max-price" className="text-xs">Max</Label>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input
                        id="max-price"
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (!isNaN(value) && value >= priceRange[0]) {
                            setPriceRange([priceRange[0], value]);
                          }
                        }}
                        className="pl-6 h-8 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Condition Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'h-8 px-3 text-xs',
                  selectedConditions.length > 0 && 'bg-primary/10 border-primary/30'
                )}
              >
                <Icons.checkCircle className="mr-1 h-3.5 w-3.5" />
                Condition
                {selectedConditions.length > 0 && (
                  <span className="ml-1 text-xs font-medium">
                    ({selectedConditions.length})
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2" align="start">
              <div className="space-y-2">
                {conditions.map((condition) => (
                  <div key={condition.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cond-${condition.id}`}
                      checked={selectedConditions.includes(condition.id)}
                      onCheckedChange={() => toggleCondition(condition.id)}
                    />
                    <Label htmlFor={`cond-${condition.id}`} className="text-sm font-normal">
                      {condition.name}
                    </Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Location Filter */}
          <div className="relative">
            <Icons.mapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-8 w-40 pl-8 text-xs"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-xs"
            onClick={resetFilters}
          >
            <Icons.x className="mr-1 h-3.5 w-3.5" />
            Clear all
          </Button>
          
          <Button size="sm" className="h-8 px-3 text-xs">
            <Icons.filter className="mr-1 h-3.5 w-3.5" />
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
