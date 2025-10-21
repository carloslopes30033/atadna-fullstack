# 📦 Directus CMS Configuration Guide - عتادنا (Atadna)

**Last Updated:** 2025-10-21  
**Version:** 11.3.5  
**Project:** B2B Wholesale Marketplace

---

## 🎯 Overview

Directus is configured as the headless CMS for Atadna, providing a powerful admin interface for managing:
- Products (with multilingual support)
- Vendors/Suppliers
- Categories
- Orders & Order Items  
- Reviews & Ratings
- Users & Authentication
- Shopping Carts

---

## 🌐 Access Information

| Item | Details |
|------|---------|
| **URL** | http://localhost:8055 |
| **Admin Email** | admin@atadna.com |
| **Admin Password** | Atadna@Admin2025 |
| **API Endpoint** | http://localhost:8055/items |
| **GraphQL** | http://localhost:8055/graphql |
| **WebSocket** | ws://localhost:8055/websocket |

---

## 📊 Discovered Collections

Directus automatically discovered the following collections from the PostgreSQL database:

### 1. **users** 👥
User accounts with authentication

**Fields:**
- `id` (UUID) - Primary key
- `email` (String) - Unique email
- `password_hash` (String) - Hashed password
- `first_name` (String)
- `last_name` (String)
- `phone` (String)
- `role` (Enum) - admin, vendor, buyer, moderator
- `status` (Enum) - active, inactive, suspended, pending
- `language` (Enum) - ar, fa, en
- `avatar_url` (String)
- `email_verified` (Boolean)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

**Icon:** 👥 people

---

### 2. **vendors** 🏢
Vendor/Supplier information

**Fields:**
- `id` (UUID) - Primary key
- `user_id` (UUID) - Foreign key to users
- `company_name` (String) - English name
- `company_name_ar` (String) - Arabic name (عربي)
- `company_name_fa` (String) - Persian name (فارسی)
- `business_license` (String) - Unique license number
- `tax_id` (String)
- `description` (Text) - English description
- `description_ar` (Text) - Arabic description
- `description_fa` (Text) - Persian description
- `logo_url` (String)
- `banner_url` (String)
- `address` (Text)
- `city` (String)
- `country` (String)
- `rating` (Decimal) - Average rating
- `is_verified` (Boolean)
- `is_featured` (Boolean)
- `created_at` (Timestamp)

**Icon:** 🏢 store

---

### 3. **categories** 📂
Product categories (hierarchical)

**Fields:**
- `id` (UUID) - Primary key
- `parent_id` (UUID) - Foreign key to categories (self-reference)
- `name` (String) - English name
- `name_ar` (String) - Arabic name
- `name_fa` (String) - Persian name
- `slug` (String) - URL-friendly identifier
- `description` (Text)
- `description_ar` (Text)
- `description_fa` (Text)
- `icon_url` (String)
- `image_url` (String)
- `sort_order` (Integer)
- `is_active` (Boolean)
- `created_at` (Timestamp)

**Icon:** 📂 category

---

### 4. **products** 🛍️
Product catalog with multilingual support

**Fields:**
- `id` (UUID) - Primary key
- `vendor_id` (UUID) - Foreign key to vendors
- `category_id` (UUID) - Foreign key to categories
- `sku` (String) - Stock Keeping Unit
- `name` (String) - English name
- `name_ar` (String) - Arabic name
- `name_fa` (String) - Persian name
- `slug` (String) - URL-friendly identifier
- `description` (Text)
- `description_ar` (Text)
- `description_fa` (Text)
- `price` (Decimal)
- `compare_price` (Decimal) - Original price
- `min_order_quantity` (Integer)
- `stock_quantity` (Integer)
- `images` (JSONB) - Array of image URLs
- `status` (Enum) - draft, active, out_of_stock, discontinued
- `is_featured` (Boolean)
- `rating` (Decimal)
- `created_at` (Timestamp)

**Icon:** 🛍️ inventory_2

---

### 5. **orders** 🛒
Customer orders

**Fields:**
- `id` (UUID) - Primary key
- `order_number` (String) - Unique order identifier
- `user_id` (UUID) - Foreign key to users
- `vendor_id` (UUID) - Foreign key to vendors
- `status` (Enum) - pending, confirmed, processing, shipped, delivered, cancelled
- `payment_status` (Enum) - pending, paid, failed, refunded
- `payment_method` (Enum)
- `subtotal` (Decimal)
- `tax` (Decimal)
- `shipping_cost` (Decimal)
- `total` (Decimal)
- `shipping_address` (JSONB)
- `ordered_at` (Timestamp)
- `delivered_at` (Timestamp)

**Icon:** 🛒 shopping_cart

---

### 6. **order_items** 📋
Order line items

**Fields:**
- `id` (UUID) - Primary key
- `order_id` (UUID) - Foreign key to orders
- `product_id` (UUID) - Foreign key to products
- `product_name` (String)
- `quantity` (Integer)
- `unit_price` (Decimal)
- `total_price` (Decimal)

**Icon:** 📋 receipt_long

---

### 7. **reviews** ⭐
Product reviews and ratings

**Fields:**
- `id` (UUID) - Primary key
- `product_id` (UUID) - Foreign key to products
- `user_id` (UUID) - Foreign key to users
- `rating` (Integer) - 1-5 stars
- `title` (String)
- `comment` (Text)
- `is_verified_purchase` (Boolean)
- `is_approved` (Boolean)
- `created_at` (Timestamp)

**Icon:** ⭐ star

---

### 8. **carts** 🛍️
Shopping carts

**Fields:**
- `id` (UUID) - Primary key
- `user_id` (UUID) - Foreign key to users
- `items` (JSONB) - Array of cart items
- `subtotal` (Decimal)
- `total` (Decimal)
- `created_at` (Timestamp)
- `expires_at` (Timestamp)

**Icon:** 🛍️ shopping_bag

---

## 🔧 API Usage Examples

### Get All Products
```bash
curl http://localhost:8055/items/products \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Products with Filters
```bash
curl "http://localhost:8055/items/products?filter[status][_eq]=active&fields=*" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Product by ID
```bash
curl http://localhost:8055/items/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create New Product
```bash
curl -X POST http://localhost:8055/items/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "name_ar": "منتج جديد",
    "sku": "PROD-001",
    "price": 99.99,
    "status": "active"
  }'
```

---

## 🌐 GraphQL Examples

### Query Products
```graphql
query {
  products(filter: { status: { _eq: "active" } }) {
    id
    name
    name_ar
    name_fa
    price
    images
    vendor {
      company_name
      company_name_ar
    }
    category {
      name
      name_ar
    }
  }
}
```

---

## 🔐 Authentication

### Login
```bash
curl -X POST http://localhost:8055/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@atadna.com",
    "password": "Atadna@Admin2025"
  }'
```

Response:
```json
{
  "data": {
    "access_token": "eyJhbGc...",
    "expires": 900000,
    "refresh_token": "abc123..."
  }
}
```

---

## 📱 Mobile App Integration

Directus provides a complete REST API for mobile apps:

```javascript
// Example: Fetch products for mobile app
const response = await fetch('http://localhost:8055/items/products?filter[status][_eq]=active', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
const products = await response.json();
```

---

## 🎨 Customization

### Project Settings
- **Project Name:** عتادنا (Atadna)
- **Description:** B2B Wholesale Marketplace
- **Default Language:** Arabic (ar-SA)
- **Primary Color:** #3B82F6 (Blue)

### Collection Icons
Each collection has a custom icon for better UI/UX in the admin panel.

---

## 📊 Sample Data

The database includes sample data:
- ✅ 5 Test Users
- ✅ 2 Vendors
- ✅ 9 Categories  
- ✅ 4 Products
- ✅ 4 Reviews

---

## 🔄 Backup & Restore

### Create Backup
```bash
docker exec atadna-postgres pg_dump -U atadna_user atadna_db > backup.sql
```

### Restore Backup
```bash
docker exec -i atadna-postgres psql -U atadna_user -d atadna_db < backup.sql
```

---

## 🚀 Next Steps

1. ✅ Collections configured and visible
2. ⏭️ Configure field display names (Arabic/Persian)
3. ⏭️ Setup custom dashboards
4. ⏭️ Configure roles & permissions
5. ⏭️ Add product images
6. ⏭️ Setup webhooks for notifications

---

## 📞 Support

For Directus documentation: https://docs.directus.io

For Atadna support:
- GitHub: @carloslopes30033
- Email: admin@atadna.com

---

**Last Configured:** 2025-10-21 15:46 UTC  
**Status:** ✅ Active & Operational
