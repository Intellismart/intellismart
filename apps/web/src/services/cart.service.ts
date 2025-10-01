import { wooCommerceService } from '@/lib/woocommerce';
import { productService } from './product.service';

type CartItem = {
  id: string;
  productId: number;
  quantity: number;
  variationId?: number;
  variation?: Record<string, any>;
  metaData?: Array<{ key: string; value: any }>;
};

type CartData = {
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  couponCode?: string;
};

export class CartService {
  private static CART_KEY = 'intellismart_cart';
  private cart: CartData;

  constructor() {
    this.cart = this.loadCart();
  }

  private loadCart(): CartData {
    if (typeof window === 'undefined') {
      return this.getEmptyCart();
    }

    try {
      const cartData = localStorage.getItem(CartService.CART_KEY);
      return cartData ? JSON.parse(cartData) : this.getEmptyCart();
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return this.getEmptyCart();
    }
  }

  private saveCart() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CartService.CART_KEY, JSON.stringify(this.cart));
    }
  }

  private getEmptyCart(): CartData {
    return {
      items: [],
      total: 0,
      subtotal: 0,
      shipping: 0,
      tax: 0,
      discount: 0,
    };
  }

  private async calculateCart() {
    let subtotal = 0;
    let shipping = 0;
    let tax = 0;
    let discount = 0;

    // Calculate subtotal
    for (const item of this.cart.items) {
      try {
        const product = await productService.getProduct(item.productId);
        if (product) {
          subtotal += parseFloat(product.price || '0') * item.quantity;
        }
      } catch (error) {
        console.error(`Error calculating price for product ${item.productId}:`, error);
      }
    }

    // Apply coupon if exists
    if (this.cart.couponCode) {
      // In a real app, you would validate the coupon with WooCommerce
      // discount = await this.calculateDiscount(this.cart.couponCode, subtotal);
    }

    // Calculate shipping (simplified)
    shipping = subtotal > 0 ? 10 : 0; // Flat rate shipping

    // Calculate tax (simplified)
    tax = subtotal * 0.1; // 10% tax

    // Calculate total
    const total = subtotal + shipping + tax - discount;

    this.cart = {
      ...this.cart,
      subtotal: parseFloat(subtotal.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    };

    this.saveCart();
    return this.cart;
  }

  async getCart() {
    await this.calculateCart();
    return this.cart;
  }

  async addToCart(item: Omit<CartItem, 'id'>) {
    const existingItemIndex = this.cart.items.findIndex(
      (i) => i.productId === item.productId && i.variationId === item.variationId
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item already in cart
      this.cart.items[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item to cart
      this.cart.items.push({
        ...item,
        id: `${item.productId}-${item.variationId || '0'}-${Date.now()}`,
      });
    }

    return this.calculateCart();
  }

  async updateCartItem(itemId: string, updates: Partial<CartItem>) {
    const itemIndex = this.cart.items.findIndex((item) => item.id === itemId);

    if (itemIndex >= 0) {
      this.cart.items[itemIndex] = {
        ...this.cart.items[itemIndex],
        ...updates,
        id: this.cart.items[itemIndex].id, // Preserve ID
      };

      return this.calculateCart();
    }

    return this.cart;
  }

  async removeFromCart(itemId: string) {
    this.cart.items = this.cart.items.filter((item) => item.id !== itemId);
    return this.calculateCart();
  }

  async updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      return this.removeFromCart(itemId);
    }
    return this.updateCartItem(itemId, { quantity });
  }

  async applyCoupon(code: string) {
    // In a real app, you would validate the coupon with WooCommerce
    this.cart.couponCode = code;
    return this.calculateCart();
  }

  async removeCoupon() {
    this.cart.couponCode = undefined;
    this.cart.discount = 0;
    return this.calculateCart();
  }

  async clearCart() {
    this.cart = this.getEmptyCart();
    this.saveCart();
    return this.cart;
  }

  async createOrder(customerData: any) {
    try {
      const cart = await this.getCart();
      
      const orderData = {
        payment_method: 'bacs',
        payment_method_title: 'Direct Bank Transfer',
        status: 'pending',
        customer_id: customerData.id || 0,
        billing: {
          first_name: customerData.firstName,
          last_name: customerData.lastName,
          email: customerData.email,
          phone: customerData.phone,
          address_1: customerData.address1,
          address_2: customerData.address2 || '',
          city: customerData.city,
          state: customerData.state,
          postcode: customerData.postcode,
          country: customerData.country,
        },
        shipping: {
          first_name: customerData.shippingFirstName || customerData.firstName,
          last_name: customerData.shippingLastName || customerData.lastName,
          address_1: customerData.shippingAddress1 || customerData.address1,
          address_2: customerData.shippingAddress2 || customerData.address2 || '',
          city: customerData.shippingCity || customerData.city,
          state: customerData.shippingState || customerData.state,
          postcode: customerData.shippingPostcode || customerData.postcode,
          country: customerData.shippingCountry || customerData.country,
        },
        line_items: cart.items.map((item) => ({
          product_id: item.productId,
          variation_id: item.variationId || 0,
          quantity: item.quantity,
        })),
        shipping_lines: [
          {
            method_id: 'flat_rate',
            method_title: 'Flat Rate',
            total: cart.shipping.toString(),
          },
        ],
        fee_lines: cart.discount > 0 ? [
          {
            name: 'Discount',
            total: `-${cart.discount}`,
          },
        ] : [],
        coupon_lines: cart.couponCode ? [
          {
            code: cart.couponCode,
            discount: cart.discount.toString(),
          },
        ] : [],
      };

      const order = await wooCommerceService.createOrder(orderData);
      
      // Clear cart after successful order
      if (order.id) {
        await this.clearCart();
      }

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }
}

export const cartService = new CartService();
