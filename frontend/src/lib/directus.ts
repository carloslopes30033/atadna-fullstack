/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🔌 DIRECTUS API CLIENT
 * ═══════════════════════════════════════════════════════════════════════════
 * Atadna B2B Marketplace - API Integration Layer
 * Handles all communication with Directus CMS
 * ═══════════════════════════════════════════════════════════════════════════
 */

import axios, { AxiosInstance } from 'axios';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface Product {
  id: string;
  vendor_id: string;
  category_id: string;
  sku: string;
  name: string;
  name_ar: string | null;
  name_fa: string | null;
  slug: string;
  description: string | null;
  description_ar: string | null;
  description_fa: string | null;
  price: number;
  compare_price: number | null;
  min_order_quantity: number;
  stock_quantity: number;
  images: string[] | null;
  status: 'draft' | 'active' | 'out_of_stock' | 'discontinued';
  is_featured: boolean;
  rating: number;
  created_at: string;
}

export interface Category {
  id: string;
  parent_id: string | null;
  name: string;
  name_ar: string | null;
  name_fa: string | null;
  slug: string;
  description: string | null;
  description_ar: string | null;
  description_fa: string | null;
  icon: string | null;
  icon_url: string | null;
  image_url: string | null;
  is_active: boolean;
}

export interface Vendor {
  id: string;
  company_name: string;
  company_name_ar: string | null;
  company_name_fa: string | null;
  logo_url: string | null;
  rating: number;
  is_verified: boolean;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string | null;
  rating: number;
  title: string | null;
  comment: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// API CLIENT
// ═══════════════════════════════════════════════════════════════════════════

class DirectusClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: DIRECTUS_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUCTS
  // ─────────────────────────────────────────────────────────────────────────

  async getProducts(params?: {
    limit?: number;
    offset?: number;
    search?: string;
    category?: string;
    vendor?: string;
    status?: string;
  }) {
    try {
      const filters: any = {};
      
      if (params?.status) {
        filters.status = { _eq: params.status };
      }
      if (params?.category) {
        filters.category_id = { _eq: params.category };
      }
      if (params?.vendor) {
        filters.vendor_id = { _eq: params.vendor };
      }
      if (params?.search) {
        filters._or = [
          { name: { _icontains: params.search } },
          { name_ar: { _icontains: params.search } },
          { name_fa: { _icontains: params.search } },
        ];
      }

      const response = await this.client.get('/items/products', {
        params: {
          limit: params?.limit || 20,
          offset: params?.offset || 0,
          filter: JSON.stringify(filters),
          sort: ['-created_at'],
        },
      });

      return response.data.data as Product[];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getProduct(id: string) {
    try {
      const response = await this.client.get(`/items/products/${id}`);
      return response.data.data as Product;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  async getFeaturedProducts(limit: number = 8) {
    try {
      const response = await this.client.get('/items/products', {
        params: {
          limit,
          filter: JSON.stringify({
            is_featured: { _eq: true },
            status: { _eq: 'active' },
          }),
        },
      });
      return response.data.data as Product[];
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CATEGORIES
  // ─────────────────────────────────────────────────────────────────────────

  async getCategories() {
    try {
      const response = await this.client.get('/items/categories', {
        params: {
          filter: JSON.stringify({ is_active: { _eq: true } }),
          sort: ['sort_order'],
        },
      });
      return response.data.data as Category[];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async getCategory(id: string) {
    try {
      const response = await this.client.get(`/items/categories/${id}`);
      return response.data.data as Category;
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // VENDORS
  // ─────────────────────────────────────────────────────────────────────────

  async getVendors() {
    try {
      const response = await this.client.get('/items/vendors', {
        params: {
          filter: JSON.stringify({ is_verified: { _eq: true } }),
        },
      });
      return response.data.data as Vendor[];
    } catch (error) {
      console.error('Error fetching vendors:', error);
      return [];
    }
  }

  async getVendor(id: string) {
    try {
      const response = await this.client.get(`/items/vendors/${id}`);
      return response.data.data as Vendor;
    } catch (error) {
      console.error('Error fetching vendor:', error);
      return null;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // REVIEWS
  // ─────────────────────────────────────────────────────────────────────────

  async getProductReviews(productId: string) {
    try {
      const response = await this.client.get('/items/reviews', {
        params: {
          filter: JSON.stringify({
            product_id: { _eq: productId },
            is_approved: { _eq: true },
          }),
          sort: ['-created_at'],
        },
      });
      return response.data.data as Review[];
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// SINGLETON EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export const directus = new DirectusClient();
export default directus;
