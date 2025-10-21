export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">ع</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">عتادنا</h1>
                <p className="text-sm text-gray-600">Atadna Marketplace</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition">الرئيسية</a>
              <a href="/products" className="text-gray-700 hover:text-blue-600 transition">المنتجات</a>
              <a href="/categories" className="text-gray-700 hover:text-blue-600 transition">الفئات</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">من نحن</a>
            </nav>
            <div className="flex gap-3">
              <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
                تسجيل الدخول
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:shadow-lg transition font-medium">
                إنشاء حساب
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            🚀 منصة B2B للتجارة بالجملة
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            مرحباً بك في
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> عتادنا</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            منصة التجارة الإلكترونية بالجملة للشرق الأوسط
            <br />
            <span className="text-lg">B2B Wholesale Marketplace for Middle East</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:shadow-2xl transition text-lg font-medium transform hover:scale-105 text-center">
              🛍️ تصفح المنتجات
            </a>
            <a href="/categories" className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition text-lg font-medium text-center">
              📂 تصفح حسب الفئة
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border-t-4 border-blue-600">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">آلاف المنتجات</h3>
            <p className="text-gray-600">
              اكتشف مجموعة واسعة من المنتجات بأسعار الجملة التنافسية
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border-t-4 border-green-600">
            <div className="text-5xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">موردين موثوقين</h3>
            <p className="text-gray-600">
              تعامل مع موردين معتمدين ومُصدقين من جميع أنحاء الشرق الأوسط
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border-t-4 border-purple-600">
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">شحن سريع</h3>
            <p className="text-gray-600">
              خدمة توصيل سريعة وآمنة لجميع دول الخليج والشرق الأوسط
            </p>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">حالة النظام</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-4xl mb-2">🗄️</div>
              <div className="text-sm text-gray-600 mb-1">قاعدة البيانات</div>
              <div className="text-lg font-bold text-green-600">✅ متصل</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
              <div className="text-4xl mb-2">🔴</div>
              <div className="text-sm text-gray-600 mb-1">Redis Cache</div>
              <div className="text-lg font-bold text-green-600">✅ متصل</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-4xl mb-2">📦</div>
              <div className="text-sm text-gray-600 mb-1">Directus CMS</div>
              <div className="text-lg font-bold text-green-600">✅ متصل</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-4xl mb-2">🚀</div>
              <div className="text-sm text-gray-600 mb-1">Backend API</div>
              <div className="text-lg font-bold text-green-600">✅ نشط</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">عتادنا</h3>
              <p className="text-gray-400">
                منصة التجارة بالجملة الرائدة في الشرق الأوسط
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">عن عتادنا</a></li>
                <li><a href="#" className="hover:text-white transition">اتصل بنا</a></li>
                <li><a href="#" className="hover:text-white transition">الأسئلة الشائعة</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">للموردين</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">التسجيل كمورد</a></li>
                <li><a href="#" className="hover:text-white transition">لوحة التحكم</a></li>
                <li><a href="#" className="hover:text-white transition">الدعم</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">تواصل معنا</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@atadna.com</li>
                <li>📱 +971 50 123 4567</li>
                <li>📍 دبي، الإمارات العربية المتحدة</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 عتادنا (Atadna). جميع الحقوق محفوظة.</p>
            <p className="mt-2 text-sm">حسن منصور الحراک - carloslopes30033</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
