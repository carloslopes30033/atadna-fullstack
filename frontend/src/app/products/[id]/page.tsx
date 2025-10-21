'use client';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📦 PRODUCT DETAIL PAGE
 * ═══════════════════════════════════════════════════════════════════════════
 * Display single product details with reviews from Directus
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import directus, { Product, Review } from '@/lib/directus';
import { useCartStore } from '@/store/cart';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    loadProductDetails();
  }, [productId]);

  const loadProductDetails = async () => {
    setLoading(true);
    const [productData, reviewsData] = await Promise.all([
      directus.getProduct(productId),
      directus.getProductReviews(productId),
    ]);
    setProduct(productData);
    setReviews(reviewsData);
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addItem(
      {
        id: product.id,
        productId: product.id,
        name: product.name,
        name_ar: product.name_ar,
        name_fa: product.name_fa,
        price: product.price,
        image: product.images?.[0] || null,
        sku: product.sku,
      },
      quantity
    );
    alert('تمت إضافة المنتج إلى السلة! ✅');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-9xl">❌</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">المنتج غير موجود</h2>
          <a
            href="/products"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
          >
            العودة إلى المنتجات
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
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
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <a
          href="/products"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
        >
          ← العودة إلى المنتجات
        </a>

        {/* Product Details */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div>
              <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name_ar || product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-9xl">📦</span>
                  </div>
                )}
                {product.is_featured && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                    ⭐ منتج مميز
                  </div>
                )}
              </div>
              {/* Additional Images */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {product.images.slice(1, 5).map((img, idx) => (
                    <div key={idx} className="h-20 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={img}
                        alt={`Image ${idx + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name_ar || product.name}
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-2xl">⭐</span>
                  <span className="text-2xl font-bold">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-gray-500">({reviews.length} تقييم)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.compare_price && product.compare_price > product.price && (
                    <>
                      <span className="text-2xl text-gray-500 line-through">
                        ${product.compare_price.toFixed(2)}
                      </span>
                      <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold">
                        وفر{' '}
                        {Math.round(
                          ((product.compare_price - product.price) / product.compare_price) * 100
                        )}
                        %
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">الوصف</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description_ar || product.description || 'لا يوجد وصف متاح'}
                </p>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <div>
                  <span className="text-gray-600">رمز المنتج:</span>
                  <span className="block font-bold text-gray-900">{product.sku}</span>
                </div>
                <div>
                  <span className="text-gray-600">المخزون:</span>
                  <span
                    className={`block font-bold ${
                      product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {product.stock_quantity > 0 ? `${product.stock_quantity} متوفر` : 'غير متوفر'}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">الكمية</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className={`w-full py-4 rounded-xl font-bold text-xl transition-all ${
                  product.stock_quantity > 0
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-2xl hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.stock_quantity > 0 ? '🛒 أضف إلى السلة' : 'غير متوفر حالياً'}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">التقييمات والمراجعات</h3>
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl">💭</span>
              <p className="text-gray-600 mt-4">لا توجد تقييمات بعد</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {review.user_name?.[0] || 'U'}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {review.user_name || 'مستخدم'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString('ar-SA')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment || 'لا يوجد تعليق'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
