import { NextResponse } from 'next/server';
import { wooCommerceService } from '@/lib/woocommerce';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('per_page') || '10';
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const params: Record<string, any> = {
      page,
      per_page: perPage,
      status: 'publish',
    };

    if (category) {
      params.category = category;
    }

    if (search) {
      params.search = search;
    }

    const products = await wooCommerceService.getProducts(params);
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
