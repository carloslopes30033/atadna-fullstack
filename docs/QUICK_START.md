# 🚀 عتادنا (ATADNA) - دليل البدء السريع
# Quick Start Guide

---

## 🎯 الخطوات الأساسية / Basic Steps

### 1️⃣ التحقق من البيئة / Verify Environment

```bash
# Check all requirements
node --version   # Should be 22.x
npm --version    # Should be 9.x+
docker --version # Should be installed
git --version    # Should be installed
```

### 2️⃣ بدء الخدمات / Start Services

```bash
# Navigate to project root
cd /workspaces/atadna-fullstack

# Start all Docker services
docker-compose up -d

# Check if all services are running
docker-compose ps
```

**Expected Output:**
```
NAME              STATUS              PORTS
atadna-postgres   Up (healthy)        0.0.0.0:5432->5432/tcp
atadna-redis      Up (healthy)        0.0.0.0:6379->6379/tcp
atadna-directus   Up (healthy)        0.0.0.0:8055->8055/tcp
```

### 3️⃣ بدء Frontend / Start Frontend

```bash
# Open new terminal
cd /workspaces/atadna-fullstack/frontend
npm run dev
```

**Access:** http://localhost:3000

### 4️⃣ بدء Backend / Start Backend

```bash
# Open another terminal
cd /workspaces/atadna-fullstack/backend
npm run dev
```

**Access:** http://localhost:4000

---

## 🌐 الوصول إلى الخدمات / Access Services

| الخدمة | Service | URL | معلومات الدخول | Credentials |
|--------|---------|-----|----------------|-------------|
| الواجهة الأمامية | Frontend | http://localhost:3000 | - | - |
| API الخلفي | Backend API | http://localhost:4000 | - | - |
| نظام إدارة المحتوى | Directus CMS | http://localhost:8055 | admin@atadna.com | Atadna@Admin2025 |
| قاعدة البيانات | PostgreSQL | localhost:5432 | atadna_user | atadna_secure_password_2025 |
| التخزين المؤقت | Redis | localhost:6379 | - | atadna_redis_password_2025 |

---

## ✅ اختبار الخدمات / Test Services

### Test Frontend
```bash
curl http://localhost:3000
# Should return HTML content
```

### Test Backend API
```bash
# Health check
curl http://localhost:4000/health | jq .

# Get products
curl http://localhost:4000/api/products | jq .

# Get categories
curl http://localhost:4000/api/categories | jq .

# Get vendors
curl http://localhost:4000/api/vendors | jq .
```

### Test Directus
```bash
curl http://localhost:8055/server/health
# Should return: "OK"
```

### Test PostgreSQL
```bash
docker exec -it atadna-postgres psql -U atadna_user -d atadna_db -c "SELECT COUNT(*) FROM products;"
```

### Test Redis
```bash
docker exec -it atadna-redis redis-cli -a atadna_redis_password_2025 PING
# Should return: PONG
```

---

## 🔧 أوامر مفيدة / Useful Commands

### Docker Commands

```bash
# إعادة تشغيل جميع الخدمات / Restart all services
docker-compose restart

# إيقاف الخدمات / Stop services
docker-compose stop

# حذف جميع الحاويات / Remove all containers
docker-compose down

# حذف مع البيانات / Remove with volumes
docker-compose down -v

# عرض السجلات / View logs
docker-compose logs -f

# سجلات خدمة محددة / Logs for specific service
docker-compose logs -f directus

# إعادة بناء الصور / Rebuild images
docker-compose up -d --build
```

### Database Commands

```bash
# الدخول إلى PostgreSQL / Access PostgreSQL
docker exec -it atadna-postgres psql -U atadna_user -d atadna_db

# تشغيل استعلام / Run query
docker exec -it atadna-postgres psql -U atadna_user -d atadna_db -c "SELECT * FROM users;"

# عرض الجداول / List tables
docker exec -it atadna-postgres psql -U atadna_user -d atadna_db -c "\dt"

# تصدير قاعدة البيانات / Export database
docker exec -it atadna-postgres pg_dump -U atadna_user atadna_db > backup.sql

# استيراد قاعدة البيانات / Import database
docker exec -i atadna-postgres psql -U atadna_user -d atadna_db < backup.sql
```

### Git Commands

```bash
# حالة Git / Git status
git status

# إضافة ملفات / Add files
git add .

# Commit التغييرات / Commit changes
git commit -m "Your message"

# Push للريبو / Push to repo
git push origin main

# Pull التحديثات / Pull updates
git pull origin main
```

---

## 📱 اختبار الواجهة / Test Frontend Features

1. **الصفحة الرئيسية / Homepage**
   - زر http://localhost:3000
   - يجب أن ترى الصفحة باللغة العربية
   - التصميم يجب أن يكون RTL

2. **التحقق من الميزات / Verify Features**
   - ✅ اللغة العربية
   - ✅ الاتجاه من اليمين لليسار (RTL)
   - ✅ الخط Tajawal
   - ✅ التصميم المتجاوب
   - ✅ الألوان المتدرجة

---

## 🐛 حل المشاكل / Troubleshooting

### Problem: Port already in use
```bash
# Find process using port
lsof -i :3000
lsof -i :4000
lsof -i :5432

# Kill process
kill -9 <PID>
```

### Problem: Docker container won't start
```bash
# Check logs
docker-compose logs <service-name>

# Remove and recreate
docker-compose down
docker-compose up -d
```

### Problem: Database connection error
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Restart PostgreSQL
docker-compose restart postgres

# Check connection
docker exec -it atadna-postgres psql -U atadna_user -d atadna_db -c "SELECT 1;"
```

### Problem: Frontend not loading
```bash
# Clear Next.js cache
cd frontend
rm -rf .next
npm run dev
```

---

## 📊 معلومات مهمة / Important Information

### Default Test Users

| Email | Password | Role | Language |
|-------|----------|------|----------|
| admin@atadna.com | Test@123456 | Admin | Arabic |
| vendor1@atadna.com | Test@123456 | Vendor | Arabic |
| vendor2@atadna.com | Test@123456 | Vendor | Persian |
| buyer1@atadna.com | Test@123456 | Buyer | Arabic |
| buyer2@atadna.com | Test@123456 | Buyer | Persian |

### Test Products

1. Samsung Galaxy A54 (Bulk Order)
2. Dell Latitude 5420 (Business Bulk)
3. Premium Cotton Fabric (Per Roll 100m)
4. Pure Silk Fabric (Per Roll 50m)

### Test Vendors

1. **Gulf Electronics Trading LLC** - Electronics wholesaler (Dubai)
2. **Persian Textile Industries** - Textile supplier (Dubai)

---

## 🎯 الخطوات التالية / Next Steps

1. ✅ تصفح الواجهة الأمامية / Browse frontend
2. ✅ تسجيل الدخول إلى Directus / Login to Directus
3. ✅ اختبار API endpoints
4. ✅ استكشاف قاعدة البيانات / Explore database
5. ⏭️ بدء التطوير / Start development

---

## 📞 الدعم / Support

**مشاكل؟ / Issues?**
- GitHub: [@carloslopes30033](https://github.com/carloslopes30033)
- Email: admin@atadna.com

**وثائق إضافية / Additional Documentation:**
- README.md - Project overview
- STATUS_REPORT.md - Complete status
- API Documentation - Coming soon

---

<div align="center">

**✨ نتمنى لك تطويراً سعيداً! ✨**  
**Happy Coding!**

**عتادنا (Atadna) - B2B Marketplace**

</div>
