// WooCommerce Integration Utilities
// Handles WooCommerce REST API integration and data synchronization

import { WooCommerceClient } from './apiClient'

export interface WooProduct {
  id: number
  name: string
  sku: string
  description: string
  short_description: string
  price: string
  regular_price: string
  sale_price: string
  categories: Array<{ id: number; name: string }>
  images: Array<{ src: string; alt: string }>
  stock_quantity: number
  manage_stock: boolean
  status: 'publish' | 'draft' | 'private'
  type: 'simple' | 'variable' | 'grouped'
  attributes: Array<{
    id: number
    name: string
    options: string[]
    visible: boolean
    variation: boolean
  }>
  meta_data: Array<{
    key: string
    value: any
  }>
}

export interface WooOrder {
  id: number
  status: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed'
  currency: string
  total: string
  subtotal: string
  total_tax: string
  customer_id: number
  billing: {
    first_name: string
    last_name: string
    company: string
    address_1: string
    city: string
    state: string
    postcode: string
    country: string
    email: string
    phone: string
  }
  shipping: {
    first_name: string
    last_name: string
    company: string
    address_1: string
    city: string
    state: string
    postcode: string
    country: string
  }
  line_items: Array<{
    id: number
    name: string
    product_id: number
    quantity: number
    price: number
    total: string
  }>
  date_created: string
  date_modified: string
}

export interface WooCustomer {
  id: number
  email: string
  first_name: string
  last_name: string
  username: string
  billing: {
    first_name: string
    last_name: string
    company: string
    address_1: string
    city: string
    state: string
    postcode: string
    country: string
    email: string
    phone: string
  }
  shipping: {
    first_name: string
    last_name: string
    company: string
    address_1: string
    city: string
    state: string
    postcode: string
    country: string
  }
  date_created: string
  date_modified: string
}

export class WooCommerceService {
  private client: WooCommerceClient

  constructor() {
    this.client = new WooCommerceClient()
  }

  // Product Management
  async getProducts(options?: {
    category?: string
    search?: string
    minPrice?: string
    maxPrice?: string
    perPage?: number
    page?: number
    status?: 'publish' | 'draft' | 'private'
  }): Promise<WooProduct[]> {
    try {
      const params: any = {
        per_page: options?.perPage || 20,
        page: options?.page || 1,
        status: options?.status || 'publish'
      }

      if (options?.category) params.category = options.category
      if (options?.search) params.search = options.search
      if (options?.minPrice) params.min_price = options.minPrice
      if (options?.maxPrice) params.max_price = options.maxPrice

      const response = await this.client.getProducts(params)
      return response
    } catch (error) {
      console.error('Failed to fetch WooCommerce products:', error)
      throw new Error('Failed to fetch products from WooCommerce')
    }
  }

  async getProduct(productId: number): Promise<WooProduct> {
    try {
      return await this.client.getProduct(productId)
    } catch (error) {
      console.error(`Failed to fetch WooCommerce product ${productId}:`, error)
      throw new Error(`Failed to fetch product ${productId}`)
    }
  }

  async createProduct(productData: Partial<WooProduct>): Promise<WooProduct> {
    try {
      return await this.client.createProduct(productData)
    } catch (error) {
      console.error('Failed to create WooCommerce product:', error)
      throw new Error('Failed to create product in WooCommerce')
    }
  }

  async updateProduct(productId: number, productData: Partial<WooProduct>): Promise<WooProduct> {
    try {
      return await this.client.updateProduct(productId, productData)
    } catch (error) {
      console.error(`Failed to update WooCommerce product ${productId}:`, error)
      throw new Error(`Failed to update product ${productId}`)
    }
  }

  // Order Management
  async getOrders(options?: {
    customer?: number
    status?: string
    perPage?: number
    page?: number
  }): Promise<WooOrder[]> {
    try {
      const params: any = {
        per_page: options?.perPage || 20,
        page: options?.page || 1
      }

      if (options?.customer) params.customer = options.customer
      if (options?.status) params.status = options.status

      const response = await this.client.getOrders(params)
      return response
    } catch (error) {
      console.error('Failed to fetch WooCommerce orders:', error)
      throw new Error('Failed to fetch orders from WooCommerce')
    }
  }

  async getOrder(orderId: number): Promise<WooOrder> {
    try {
      return await this.client.getOrder(orderId)
    } catch (error) {
      console.error(`Failed to fetch WooCommerce order ${orderId}:`, error)
      throw new Error(`Failed to fetch order ${orderId}`)
    }
  }

  async createOrder(orderData: {
    payment_method: string
    payment_method_title: string
    set_paid?: boolean
    billing: WooOrder['billing']
    shipping: WooOrder['shipping']
    line_items: WooOrder['line_items']
    shipping_lines?: Array<{
      method_title: string
      method_id: string
      total: string
    }>
    fee_lines?: Array<{
      name: string
      total: string
    }>
  }): Promise<WooOrder> {
    try {
      return await this.client.createOrder(orderData)
    } catch (error) {
      console.error('Failed to create WooCommerce order:', error)
      throw new Error('Failed to create order in WooCommerce')
    }
  }

  async updateOrderStatus(orderId: number, status: WooOrder['status']): Promise<WooOrder> {
    try {
      return await this.client.updateOrderStatus(orderId, status)
    } catch (error) {
      console.error(`Failed to update WooCommerce order ${orderId} status:`, error)
      throw new Error(`Failed to update order ${orderId} status`)
    }
  }

  // Customer Management
  async getCustomers(options?: {
    email?: string
    role?: string
    perPage?: number
    page?: number
  }): Promise<WooCustomer[]> {
    try {
      const params: any = {
        per_page: options?.perPage || 20,
        page: options?.page || 1
      }

      if (options?.email) params.email = options.email
      if (options?.role) params.role = options.role

      const response = await this.client.getCustomers(params)
      return response
    } catch (error) {
      console.error('Failed to fetch WooCommerce customers:', error)
      throw new Error('Failed to fetch customers from WooCommerce')
    }
  }

  async getCustomer(customerId: number): Promise<WooCustomer> {
    try {
      return await this.client.getCustomer(customerId)
    } catch (error) {
      console.error(`Failed to fetch WooCommerce customer ${customerId}:`, error)
      throw new Error(`Failed to fetch customer ${customerId}`)
    }
  }

  async createCustomer(customerData: Partial<WooCustomer>): Promise<WooCustomer> {
    try {
      return await this.client.createCustomer(customerData)
    } catch (error) {
      console.error('Failed to create WooCommerce customer:', error)
      throw new Error('Failed to create customer in WooCommerce')
    }
  }

  // Inventory Management
  async updateProductStock(productId: number, stockQuantity: number): Promise<WooProduct> {
    return this.updateProduct(productId, {
      stock_quantity: stockQuantity,
      manage_stock: true
    } as Partial<WooProduct>)
  }

  // Utility Functions
  formatProductForDisplay(product: WooProduct) {
    return {
      id: product.id,
      name: product.name,
      sku: product.sku,
      description: product.description,
      shortDescription: product.short_description,
      price: product.price,
      regularPrice: product.regular_price,
      salePrice: product.sale_price,
      categories: product.categories.map(cat => cat.name),
      images: product.images.map(img => img.src),
      stockQuantity: product.stock_quantity,
      inStock: product.stock_quantity > 0,
      status: product.status,
      type: product.type,
      attributes: product.attributes
    }
  }

  formatOrderForDisplay(order: WooOrder) {
    return {
      id: order.id,
      status: order.status,
      currency: order.currency,
      total: order.total,
      subtotal: order.subtotal,
      tax: order.total_tax,
      customerId: order.customer_id,
      customerName: `${order.billing.first_name} ${order.billing.last_name}`,
      customerEmail: order.billing.email,
      items: order.line_items.map(item => ({
        id: item.id,
        name: item.name,
        productId: item.product_id,
        quantity: item.quantity,
        price: item.price,
        total: item.total
      })),
      createdAt: order.date_created,
      updatedAt: order.date_modified
    }
  }

  formatCustomerForDisplay(customer: WooCustomer) {
    return {
      id: customer.id,
      email: customer.email,
      name: `${customer.first_name} ${customer.last_name}`,
      username: customer.username,
      billing: customer.billing,
      shipping: customer.shipping,
      createdAt: customer.date_created,
      updatedAt: customer.date_modified
    }
  }
}

// Export singleton instance
export const wooCommerceService = new WooCommerceService()

// React hook for WooCommerce data
export const useWooCommerce = () => {
  return {
    wooCommerceService,
    getProducts: wooCommerceService.getProducts.bind(wooCommerceService),
    getProduct: wooCommerceService.getProduct.bind(wooCommerceService),
    createProduct: wooCommerceService.createProduct.bind(wooCommerceService),
    updateProduct: wooCommerceService.updateProduct.bind(wooCommerceService),
    getOrders: wooCommerceService.getOrders.bind(wooCommerceService),
    getOrder: wooCommerceService.getOrder.bind(wooCommerceService),
    createOrder: wooCommerceService.createOrder.bind(wooCommerceService),
    updateOrderStatus: wooCommerceService.updateOrderStatus.bind(wooCommerceService),
  }
}
