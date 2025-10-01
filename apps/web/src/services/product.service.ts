import { wooCommerceService } from '@/lib/woocommerce';
import { cache } from 'react';

interface ProductParams {
  page?: number;
  perPage?: number;
  category?: string;
  search?: string;
}

export const productService = {
  // Get all products with caching
  getProducts: cache(async (params: ProductParams = {}) => {
    const { page = 1, perPage = 12, category, search } = params;
    
    const wooParams: Record<string, any> = {
      page,
      per_page: perPage,
      status: 'publish',
    };

    if (category) {
      wooParams.category = category;
    }

    if (search) {
      wooParams.search = search;
    }

    const products = await wooCommerceService.getProducts(wooParams);
    return this.transformProducts(products);
  }),

  // Get a single product with caching
  getProduct: cache(async (id: number) => {
    const product = await wooCommerceService.getProduct(id);
    return this.transformProduct(product);
  }),

  // Transform WooCommerce product data to our format
  transformProduct(product: any) {
    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.short_description,
      price: product.price,
      regularPrice: product.regular_price,
      salePrice: product.sale_price,
      onSale: product.on_sale,
      images: product.images?.map((img: any) => ({
        id: img.id,
        src: img.src,
        alt: img.alt || product.name,
        thumbnail: img.thumbnail || img.src,
      })) || [],
      categories: product.categories?.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })) || [],
      attributes: product.attributes?.map((attr: any) => ({
        id: attr.id,
        name: attr.name,
        options: attr.options,
      })) || [],
      stockStatus: product.stock_status,
      stockQuantity: product.stock_quantity,
      averageRating: product.average_rating,
      ratingCount: product.rating_count,
      relatedIds: product.related_ids || [],
      metaData: product.meta_data || [],
      variations: product.variations || [],
      type: product.type,
      externalUrl: product.external_url,
      buttonText: product.button_text,
      dateOnSaleFrom: product.date_on_sale_from,
      dateOnSaleTo: product.date_on_sale_to,
      totalSales: product.total_sales,
      virtual: product.virtual,
      downloadable: product.downloadable,
      downloads: product.downloads || [],
      downloadLimit: product.download_limit,
      downloadExpiry: product.download_expiry,
      taxStatus: product.tax_status,
      taxClass: product.tax_class,
      manageStock: product.manage_stock,
      weight: product.weight,
      dimensions: product.dimensions,
      shippingClass: product.shipping_class,
      shippingClassId: product.shipping_class_id,
      purchaseNote: product.purchase_note,
      catalogVisibility: product.catalog_visibility,
      hasOptions: product.has_options,
      isPurchasable: product.purchasable,
      isInStock: product.stock_status === 'instock',
      backordersAllowed: product.backorders === 'yes',
      backordered: product.backordered,
      soldIndividually: product.sold_individually,
      quantityLimit: product.sold_individually ? 1 : null,
      reviewsAllowed: product.reviews_allowed,
      averageRatingFormatted: product.average_rating
        ? `${product.average_rating} out of 5`
        : 'No ratings yet',
      priceHtml: product.price_html,
      onSale: product.on_sale,
      priceIncludingTax: product.price_including_tax,
      priceExcludingTax: product.price_excluding_tax,
    };
  },

  // Transform array of products
  transformProducts(products: any[]) {
    return products.map(product => this.transformProduct(product));
  },

  // Get related products
  async getRelatedProducts(productId: number, limit: number = 4) {
    const product = await this.getProduct(productId);
    if (!product?.relatedIds?.length) return [];
    
    const relatedIds = product.relatedIds.slice(0, limit);
    const relatedProducts = await Promise.all(
      relatedIds.map(id => this.getProduct(id).catch(() => null))
    );
    
    return relatedProducts.filter(Boolean);
  },

  // Get products by category
  async getProductsByCategory(categoryId: string, params: Omit<ProductParams, 'category'> = {}) {
    return this.getProducts({ ...params, category: categoryId });
  },

  // Search products
  async searchProducts(query: string, params: Omit<ProductParams, 'search'> = {}) {
    return this.getProducts({ ...params, search: query });
  },
};
