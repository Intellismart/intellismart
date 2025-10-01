'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { productService } from '@/services/product.service';

type Product = {
  id: number;
  name: string;
  price: string;
  regularPrice: string;
  salePrice: string;
  onSale: boolean;
  images: Array<{ src: string; alt: string }>;
  slug: string;
  averageRating: string;
  ratingCount: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts({});
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId);
      // You might want to show a success toast here
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/products/${product.slug}`}>
                <div className="relative h-64 w-full">
                  <Image
                    src={product.images[0]?.src || '/placeholder-product.jpg'}
                    alt={product.images[0]?.alt || product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h2>
                  <div className="flex items-center justify-between">
                    <div>
                      {product.onSale ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">${product.salePrice}</span>
                          <span className="text-sm text-gray-500 line-through">${product.regularPrice}</span>
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            Sale
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      )}
                    </div>
                    {product.averageRating && (
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600 ml-1">
                          {product.averageRating} ({product.ratingCount})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="w-full bg-gold hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-md transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
