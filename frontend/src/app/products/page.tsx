'use client';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🛍️ PRODUCTS PAGE
 * ═══════════════════════════════════════════════════════════════════════════
 * Display all products from Directus with filtering and search
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useEffect, useState } from 'react';
import directus, { Product } from '@/lib/directus';
import { useCartStore } from '@/store/cart';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    loadProducts();
  }, [search]);

  const loadProducts = async () => {
    setLoading(true);
    const data = await directus.getProducts({
      search: search || undefined,
      status: 'active',
      limit: 50,
    });
    setProducts(data);
    setLoading(false);
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      name_ar: product.name_ar,
      name_fa: product.name_fa,
      price: product.price,
      image: product.images?.[0] || null,
      sku: product.sku,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">ع</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">عتادنا</h1>
                  <p className="text-sm text-gray-600">Atadna Marketplace</p>
                </div>
              </a>
            </div>

            {/* Cart Icon */}
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <span className="text-lg">🛒</span>
                <span className="font-medium">السلة</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title & Search */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">جميع المنتجات</h2>
          <div className="max-w-2xl">
            <input
              type="text"
              placeholder="ابحث عن المنتجات..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 text-lg">جاري التحميل...</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name_ar || product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl">📦</span>
                    </div>
                  )}
                  {product.is_featured && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                      ⭐ مميز
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {product.name_ar || product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {product.description_ar || product.description || 'لا يوجد وصف'}
                  </p>

                  {/* Price & Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.compare_price && product.compare_price > product.price && (
                        <span className="block text-sm text-gray-500 line-through">
                          ${product.compare_price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-medium">{product.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Stock Info */}
                  <div className="mb-4 text-sm">
                    <span className="text-gray-600">المخزون: </span>
                    <span className={`font-medium ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock_quantity > 0 ? `${product.stock_quantity} متوفر` : 'غير متوفر'}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock_quantity === 0}
                    className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                      product.stock_quantity > 0
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-lg hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.stock_quantity > 0 ? '🛒 أضف إلى السلة' : 'غير متوفر'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Products */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <span className="text-9xl">📦</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">لا توجد منتجات</h3>
            <p className="text-gray-600 mt-2">جرب البحث بكلمات مختلفة</p>
          </div>
        )}
      </main>
    </div>
  );
}
