// API Client for IntelliSMART Platform
// Handles communication with backend APIs, WooCommerce, and external services

interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || '/api') {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body } = options

    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.body = JSON.stringify(body)
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Generic CRUD operations
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const searchParams = params ? new URLSearchParams(params).toString() : ''
    const url = searchParams ? `${endpoint}?${searchParams}` : endpoint
    return this.request<T>(url)
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body: data })
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body: data })
  }

  async patch<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body: data })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

// WooCommerce API Client
export class WooCommerceClient {
  private baseURL: string
  private consumerKey: string
  private consumerSecret: string

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_WC_BASE_URL || ''
    this.consumerKey = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY || ''
    this.consumerSecret = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET || ''
  }

  private getAuthHeader(): string {
    const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64')
    return `Basic ${auth}`
  }

  private async request(endpoint: string, options: RequestOptions = {}) {
    const url = `${this.baseURL}/wp-json/wc/v3${endpoint}`

    const config: RequestInit = {
      ...options,
      headers: {
        'Authorization': this.getAuthHeader(),
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.status}`)
    }

    return response.json()
  }

  // Product operations
  async getProducts(params?: {
    category?: string
    search?: string
    minPrice?: string
    maxPrice?: string
    per_page?: number
    page?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }
    return this.request(`/products?${searchParams.toString()}`)
  }

  async getProduct(id: number) {
    return this.request(`/products/${id}`)
  }

  async createProduct(productData: any) {
    return this.request('/products', { method: 'POST', body: productData })
  }

  async updateProduct(id: number, productData: any) {
    return this.request(`/products/${id}`, { method: 'PUT', body: productData })
  }

  // Order operations
  async getOrders(params?: {
    customer?: number
    status?: string
    per_page?: number
    page?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }
    return this.request(`/orders?${searchParams.toString()}`)
  }

  async getOrder(id: number) {
    return this.request(`/orders/${id}`)
  }

  async createOrder(orderData: any) {
    return this.request('/orders', { method: 'POST', body: orderData })
  }

  async updateOrderStatus(id: number, status: string) {
    return this.request(`/orders/${id}`, {
      method: 'PUT',
      body: { status }
    })
  }

  // Customer operations
  async getCustomers(params?: {
    email?: string
    role?: string
    per_page?: number
    page?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }
    return this.request(`/customers?${searchParams.toString()}`)
  }

  async getCustomer(id: number) {
    return this.request(`/customers/${id}`)
  }

  async createCustomer(customerData: any) {
    return this.request('/customers', { method: 'POST', body: customerData })
  }
}

// Payment clients (Stripe, PayPal)
export class StripeClient {
  private publishableKey: string

  constructor() {
    this.publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
  }

  // Client-side Stripe operations would go here
  // Note: Server-side operations should be handled by API routes
}

export class PayPalClient {
  private clientId: string

  constructor() {
    this.clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''
  }

  // Client-side PayPal operations would go here
}

// Main API client instance
export const apiClient = new ApiClient()

// WooCommerce client instance
export const wooCommerce = new WooCommerceClient()

// Payment clients
export const stripe = new StripeClient()
export const paypal = new PayPalClient()

// Utility functions
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.message) {
    return error.message
  }
  return 'An unexpected error occurred'
}

export const formatApiResponse = <T>(response: ApiResponse<T>): T => {
  return response.data
}
