import axios from 'axios';

interface WooCommerceConfig {
  url: string;
  consumerKey: string;
  consumerSecret: string;
  version?: string;
}

export class WooCommerceService {
  private config: WooCommerceConfig;
  private api: ReturnType<typeof this.createAxiosClient>;

  constructor(config: WooCommerceConfig) {
    this.config = {
      version: 'wc/v3',
      ...config
    };
    this.api = this.createAxiosClient();
  }

  private createAxiosClient() {
    const auth = {
      username: this.config.consumerKey,
      password: this.config.consumerSecret,
    };

    return axios.create({
      baseURL: `${this.config.url}/wp-json/${this.config.version}`,
      auth,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Products
  async getProducts(params: Record<string, any> = {}) {
    const response = await this.api.get('/products', { params });
    return response.data;
  }

  async getProduct(id: number) {
    const response = await this.api.get(`/products/${id}`);
    return response.data;
  }

  // Orders
  async createOrder(orderData: any) {
    const response = await this.api.post('/orders', orderData);
    return response.data;
  }

  async getOrder(id: number) {
    const response = await this.api.get(`/orders/${id}`);
    return response.data;
  }

  // Customers
  async createCustomer(customerData: any) {
    const response = await this.api.post('/customers', customerData);
    return response.data;
  }

  async getCustomer(id: number) {
    const response = await this.api.get(`/customers/${id}`);
    return response.data;
  }

  async updateCustomer(id: number, customerData: any) {
    const response = await this.api.put(`/customers/${id}`, customerData);
    return response.data;
  }

  // Webhooks
  async createWebhook(webhookData: any) {
    const response = await this.api.post('/webhooks', webhookData);
    return response.data;
  }

  // Categories
  async getCategories() {
    const response = await this.api.get('/products/categories');
    return response.data;
  }

  // Shipping Zones
  async getShippingZones() {
    const response = await this.api.get('/shipping/zones');
    return response.data;
  }

  // Payment Gateways
  async getPaymentGateways() {
    const response = await this.api.get('/payment_gateways');
    return response.data;
  }
}

// Create a singleton instance
export const wooCommerceService = new WooCommerceService({
  url: process.env.WOOCOMMERCE_URL || '',
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || '',
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || '',
  version: process.env.WOOCOMMERCE_API_VERSION || 'wc/v3',
});
