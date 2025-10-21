'use client';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📂 CATEGORIES PAGE
 * ═══════════════════════════════════════════════════════════════════════════
 * Browse products by category from Directus
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useEffect, useState } from 'react';
import directus, { Category, Product } from '@/lib/directus';
import { useCartStore } from '@/store/cart';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const loadCategories = async () => {
    setLoading(true);
    const data = await directus.getCategories();
    setCategories(data);
    if (data.length > 0) {
      setSelectedCategory(data[0].id);
    }
    setLoading(false);
  };

  const loadProductsByCategory = async (categoryId: string) => {
    const data = await directus.getProducts({
      category: categoryId,
      status: 'active',
      limit: 50,
    });
    setProducts(data);
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

  const selectedCat = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">تصفح حسب الفئة</h2>

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 text-lg">جاري التحميل...</p>
          </div>
        )}

        {!loading && (
          <div className="flex gap-8">
            {/* Categories Sidebar */}
            <div className="w-80 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">الفئات</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-right px-4 py-3 rounded-xl font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name_ar || category.name}</span>
                      <span>{category.icon || '📦'}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {selectedCat && (
                <div className="mb-6 p-6 bg-white rounded-2xl shadow-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{selectedCat.icon || '📦'}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedCat.name_ar || selectedCat.name}
                      </h3>
                      <p className="text-gray-600">
                        {selectedCat.description_ar || selectedCat.description || 'لا يوجد وصف'}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {products.length} منتج متوفر
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {products.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                  <span className="text-9xl">📦</span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-4">لا توجد منتجات في هذه الفئة</h3>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Product Image */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
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
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                        {product.name_ar || product.name}
                      </h4>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-blue-600">
                          ${product.price.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="font-medium">{product.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock_quantity === 0}
                        className={`w-full py-2 rounded-lg font-bold transition-all ${
                          product.stock_quantity > 0
                            ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-lg'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {product.stock_quantity > 0 ? '🛒 أضف إلى السلة' : 'غير متوفر'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
