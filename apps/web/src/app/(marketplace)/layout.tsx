'use client';

import { ReactNode, useState } from 'react';
import { MarketplaceHeader as Header } from '@/components/marketplace/header';
import { MarketplaceFilters as Filters } from '@/components/marketplace/filters';

export default function MarketplaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-white">
      <Header />
      
      <div>
        {/* Mobile filter dialog */}
        <Filters 
          mobileFiltersOpen={mobileFiltersOpen} 
          setMobileFiltersOpen={setMobileFiltersOpen} 
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Marketplace</h1>

            <div className="flex items-center">
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    id="menu-button"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    Filters
                    <svg
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <section className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div className="hidden lg:block">
                <Filters 
                  mobileFiltersOpen={mobileFiltersOpen} 
                  setMobileFiltersOpen={setMobileFiltersOpen} 
                />
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {children}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
