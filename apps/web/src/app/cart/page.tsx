'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { productService } from '@/services/product.service';

type CartItem = {
  id: string;
  productId: number;
  quantity: number;
  product?: {
    id: number;
    name: string;
    price: string;
    regularPrice: string;
    salePrice: string;
    onSale: boolean;
    images: Array<{ src: string; alt: string }>;
    stockStatus: string;
  };
};

export default function CartPage() {
  const { 
    cart, 
    loading, 
    updateQuantity, 
    removeFromCart, 
    applyCoupon, 
    removeCoupon,
    refreshCart 
  } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Load product details for each cart item
  useEffect(() => {
    const loadProducts = async () => {
      if (!cart.items.length) {
        setIsLoadingProducts(false);
        return;
      }

      try {
        setIsLoadingProducts(true);
        const itemsWithProducts = await Promise.all(
          cart.items.map(async (item) => {
            try {
              const product = await productService.getProduct(item.productId);
              return { ...item, product };
            } catch (error) {
              console.error(`Error loading product ${item.productId}:`, error);
              return { ...item, product: undefined };
            }
          })
        );
        setCartItems(itemsWithProducts);
      } catch (error) {
        console.error('Error loading cart products:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    loadProducts();
  }, [cart.items]);

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    await updateQuantity(itemId, quantity);
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    
    try {
      setIsApplyingCoupon(true);
      await applyCoupon(couponCode);
      setCouponCode('');
    } catch (error) {
      console.error('Error applying coupon:', error);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      await removeCoupon();
    } catch (error) {
      console.error('Error removing coupon:', error);
    }
  };

  if (loading || isLoadingProducts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        {cart.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h2>
            <p className="mt-1 text-gray-500">Start shopping to add items to your cart.</p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            {/* Cart items */}
            <div className="lg:col-span-8">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-shrink-0">
                          {item.product?.images?.[0]?.src ? (
                            <Image
                              src={item.product.images[0].src}
                              alt={item.product.images[0].alt || item.product.name}
                              width={150}
                              height={150}
                              className="w-full h-32 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center">
                              <span className="text-gray-400">No image</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                              {item.product?.name || 'Product not found'}
                            </h3>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <span className="sr-only">Remove</span>
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>

                          {item.product && (
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.onSale ? (
                                <>
                                  <span className="text-gray-900 font-medium">
                                    ${item.product.salePrice}
                                  </span>{' '}
                                  <span className="line-through text-gray-400">
                                    ${item.product.regularPrice}
                                  </span>
                                </>
                              ) : (
                                <span className="text-gray-900 font-medium">
                                  ${item.product.price}
                                </span>
                              )}
                            </p>
                          )}

                          <div className="mt-4 flex items-center">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                type="button"
                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <span className="w-10 text-center">{item.quantity}</span>
                              <button
                                type="button"
                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                disabled={item.product?.stockStatus === 'outofstock'}
                              >
                                +
                              </button>
                            </div>

                            {item.product?.stockStatus === 'outofstock' && (
                              <span className="ml-4 text-sm text-red-600">Out of stock</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0 lg:col-span-4">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${cart.subtotal.toFixed(2)}</span>
                  </div>

                  {cart.discount > 0 && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-gray-600">Discount</span>
                        {cart.couponCode && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            {cart.couponCode}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-green-600">-${cart.discount.toFixed(2)}</span>
                        {cart.couponCode && (
                          <button
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="ml-2 text-gray-400 hover:text-red-500"
                          >
                            <span className="sr-only">Remove coupon</span>
                            <svg
                              className="h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${cart.shipping.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${cart.tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-lg font-bold text-gray-900">${cart.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon form */}
                <form onSubmit={handleApplyCoupon} className="mt-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                    Coupon code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm"
                      placeholder="Enter code"
                    />
                    <button
                      type="submit"
                      disabled={isApplyingCoupon || !couponCode.trim()}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white ${
                        isApplyingCoupon || !couponCode.trim()
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                      }`}
                    >
                      {isApplyingCoupon ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                </form>

                <div className="mt-6">
                  <Link
                    href="/checkout"
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold"
                  >
                    Proceed to Checkout
                  </Link>
                </div>

                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>
                    or{' '}
                    <Link href="/products" className="font-medium text-gold hover:text-yellow-600">
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
