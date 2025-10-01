'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { productService } from '@/services/product.service';

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  regularPrice: string;
  salePrice: string;
  onSale: boolean;
  images: Array<{ src: string; alt: string }>;
  attributes: Array<{ name: string; options: string[] }>;
  categories: Array<{ name: string; slug: string }>;
  averageRating: string;
  ratingCount: number;
  stockStatus: string;
  sku: string;
  relatedIds: number[];
};

type Params = {
  slug: string;
};

export default function ProductDetailPage() {
  const params = useParams<Params>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch by slug, but we'll use the product ID for now
        const productId = parseInt(params.slug.split('-').pop() || '0');
        const data = await productService.getProduct(productId);
        
        if (!data) {
          throw new Error('Product not found');
        }
        
        setProduct(data);
        
        // Fetch related products
        if (data.relatedIds && data.relatedIds.length > 0) {
          const related = await Promise.all(
            data.relatedIds.slice(0, 4).map(id => 
              productService.getProduct(id).catch(() => null)
            )
          );
          setRelatedProducts(related.filter(Boolean) as Product[]);
        }
        
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  const handleAttributeSelect = (name: string, value: string) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart(product.id, quantity);
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

  if (error || !product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <a href="/" className="text-gray-700 hover:text-gold">
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <a href="/products" className="text-gray-700 hover:text-gold">
                  Products
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
                {product.images.length > 0 ? (
                  <Image
                    src={product.images[selectedImage]?.src}
                    alt={product.images[selectedImage]?.alt || product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-md overflow-hidden ${
                        selectedImage === index ? 'ring-2 ring-gold' : ''
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt || `${product.name} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="mt-6 lg:mt-0">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              
              {/* Price */}
              <div className="mt-4">
                {product.onSale ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-gray-900">
                      ${product.salePrice}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.regularPrice}
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      Sale
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                )}
              </div>

              {/* Rating */}
              {product.averageRating && (
                <div className="mt-2 flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        {i < Math.floor(parseFloat(product.averageRating)) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.ratingCount} reviews)
                  </span>
                </div>
              )}

              {/* SKU */}
              {product.sku && (
                <div className="mt-2 text-sm text-gray-500">
                  SKU: {product.sku}
                </div>
              )}

              {/* Availability */}
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  product.stockStatus === 'instock' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.stockStatus === 'instock' ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Description</h3>
                <div 
                  className="mt-2 text-gray-600 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              {/* Product Attributes */}
              {product.attributes && product.attributes.length > 0 && (
                <div className="mt-6">
                  {product.attributes.map((attribute) => (
                    <div key={attribute.name} className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900">{attribute.name}</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {attribute.options.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleAttributeSelect(attribute.name, option)}
                            className={`px-3 py-1 border rounded-full text-sm ${
                              selectedAttributes[attribute.name] === option
                                ? 'bg-gold text-black border-gold'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add to Cart */}
              <div className="mt-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      type="button"
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      type="button"
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={product.stockStatus !== 'instock'}
                    className={`flex-1 bg-gold hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-md transition-colors ${
                      product.stockStatus !== 'instock' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {product.stockStatus === 'instock' ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>

              {/* Categories */}
              {product.categories && product.categories.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900">Categories</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.categories.map((category) => (
                      <a
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                      >
                        {category.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <a href={`/products/${relatedProduct.id}`} className="block">
                    <div className="relative h-48 w-full">
                      <Image
                        src={relatedProduct.images[0]?.src || '/placeholder-product.jpg'}
                        alt={relatedProduct.images[0]?.alt || relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900">{relatedProduct.name}</h3>
                      <div className="mt-2">
                        {relatedProduct.onSale ? (
                          <div className="flex items-center space-x-2">
                            <span className="font-bold">${relatedProduct.salePrice}</span>
                            <span className="text-sm text-gray-500 line-through">
                              ${relatedProduct.regularPrice}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold">${relatedProduct.price}</span>
                        )}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
