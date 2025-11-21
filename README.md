# 🛍️ عتادنا (Atadna) - B2B Wholesale Marketplace

[![GitHub](https://img.shields.io/badge/GitHub-carloslopes30033-blue?logo=github)](https://github.com/carloslopes30033/atadna-fullstack)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-brightgreen?logo=node.js)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://postgresql.org)
[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org)

**منصة التجارة الإلكترونية بالجملة للشرق الأوسط**  
*B2B Wholesale Marketplace for Middle East*

---

## 📋 المحتويات / Table of Contents

- [🌟 نظرة عامة](#-overview)
- [✨ المميزات](#-features)
- [🏗️ البنية التقنية](#-tech-stack)
- [📁 هيكل المشروع](#-project-structure)
- [🚀 التثبيت والتشغيل](#-installation)
- [🐳 Docker](#-docker)
- [🔧 الإعدادات](#-configuration)
- [📡 API Endpoints](#-api-endpoints)
- [👨‍💻 المساهمة](#-contributing)
- [📄 الترخيص](#-license)

---

## 🌟 Overview / نظرة عامة

**عتادنا (Atadna)** هي منصة تجارة إلكترونية B2B متكاملة مصممة خصيصاً للشرق الأوسط، تدعم اللغات العربية والفارسية والإنجليزية مع واجهة RTL كاملة.

**Atadna** is a comprehensive B2B e-commerce marketplace designed specifically for the Middle East, supporting Arabic, Persian, and English languages with full RTL interface.

### 🎯 الهدف / Purpose

توفير منصة موثوقة وآمنة للموردين والمشترين في منطقة الشرق الأوسط لإجراء معاملات بالجملة بكفاءة عالية.

---

## ✨ Features / المميزات

### 🌐 Multi-Language Support
- ✅ العربية (Arabic) - RTL
- ✅ فارسی (Persian/Farsi) - RTL  
- ✅ English - LTR

### 🏢 Vendor Management
- تسجيل وإدارة الموردين
- لوحة تحكم خاصة للموردين
- إدارة المنتجات والمخزون
- تتبع الطلبيات والمبيعات

### 🛍️ Product Catalog
- كتالوج منتجات شامل
- تصنيفات متعددة المستويات
- بحث متقدم بالنصوص العربية/الفارسية
- تقييمات ومراجعات المنتجات

### 📦 Order Management
- نظام طلبات متكامل
- تتبع الشحنات
- إدارة المدفوعات
- فواتير تلقائية

### 🔐 Security
- مصادقة JWT
- تشفير البيانات
- حماية من CSRF & XSS
- Rate limiting

---

## 🏗️ Tech Stack / البنية التقنية

### Frontend
- **Framework:** Next.js 15.x (React 18)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS
- **Fonts:** Tajawal (Arabic)

### Backend
- **Runtime:** Node.js 22.x
- **Framework:** Express.js
- **Language:** TypeScript
- **API:** RESTful

### CMS
- **Platform:** Directus 11.3
- **Features:** Headless CMS for content management

### Database
- **Primary:** PostgreSQL 16
- **Cache:** Redis 7

### DevOps
- **Containerization:** Docker & Docker Compose
- **Environment:** GitHub Codespaces

---

## 📁 Project Structure / هيكل المشروع

```
atadna-fullstack/
├── 📂 frontend/              # Next.js Frontend Application
│   ├── src/
│   │   ├── app/             # Next.js App Router
│   │   ├── components/      # React Components
│   │   └── lib/             # Utilities & Helpers
│   ├── public/              # Static Assets
│   ├── Dockerfile           # Frontend Docker Config
│   └── package.json
│
├── 📂 backend/               # Express.js Backend API
│   ├── src/
│   │   ├── index.ts         # Main Entry Point
│   │   ├── routes/          # API Routes
│   │   ├── controllers/     # Route Controllers
│   │   ├── models/          # Database Models
│   │   └── middleware/      # Custom Middleware
│   ├── Dockerfile           # Backend Docker Config
│   └── package.json
│
├── 📂 database/              # Database Files
│   ├── migrations/          # SQL Migration Scripts
│   │   └── 01_init.sql     # Initial Schema
│   └── seeds/               # Seed Data
│       └── 01_seed.sql     # Sample Data
│
├── 📂 directus/              # Directus CMS Configuration
│   └── config/              # CMS Settings
│
├── 📂 docker/                # Docker Configurations
│
├── 📂 scripts/               # Utility Scripts
│
├── 📂 docs/                  # Documentation
│
├── 🐳 docker-compose.yml    # Docker Services Configuration
├── 📝 .env                  # Environment Variables
├── 📋 .gitignore            # Git Ignore Rules
└── 📖 README.md             # This File

```

---

## 🚀 Installation / التثبيت والتشغيل

### Prerequisites / المتطلبات

- Node.js 22.x or higher
- Docker & Docker Compose
- Git
- npm 9.x or higher

### Quick Start / البدء السريع

```bash
# 1. Clone the repository
git clone https://github.com/carloslopes30033/atadna-fullstack.git
cd atadna-fullstack

# 2. Start all services with Docker
docker-compose up -d

# 3. Check service status
docker-compose ps

# 4. View logs
docker-compose logs -f

# 5. Access the applications
# Frontend:      http://localhost:3000
# Backend API:   http://localhost:4000
# Directus CMS:  http://localhost:8055
# PostgreSQL:    localhost:5432
# Redis:         localhost:6379
```

### Manual Setup / التثبيت اليدوي

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

#### Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## 🐳 Docker

### Services / الخدمات

| Service | Port | Description |
|---------|------|-------------|
| **Frontend** | 3000 | Next.js Application |
| **Backend** | 4000 | Express.js API |
| **Directus** | 8055 | Headless CMS |
| **PostgreSQL** | 5432 | Database |
| **Redis** | 6379 | Cache |

### Docker Commands / أوامر Docker

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Restart a specific service
docker-compose restart frontend

# View logs
docker-compose logs -f backend

# Rebuild containers
docker-compose up -d --build

# Remove all containers and volumes
docker-compose down -v
```

---

## 🔧 Configuration / الإعدادات

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://atadna_user:atadna_secure_password_2025@localhost:5432/atadna_db

# Redis
REDIS_URL=redis://:atadna_redis_password_2025@localhost:6379

# Directus
DIRECTUS_URL=http://localhost:8055
DIRECTUS_EMAIL=admin@atadna.com
DIRECTUS_PASSWORD=Atadna@Admin2025

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:8055

# Security
JWT_SECRET=your-secret-key
```

---

## 📡 API Endpoints

### Health Check
```http
GET /health
```

### Products
```http
GET    /api/products              # List all products
GET    /api/products/best         # Get best rated product
GET    /api/products/:id          # Get single product
POST   /api/products              # Create product (vendor)
PUT    /api/products/:id          # Update product (vendor)
DELETE /api/products/:id          # Delete product (vendor)
```

### Vendors
```http
GET    /api/vendors               # List all vendors
GET    /api/vendors/best          # Get best rated vendor
GET    /api/vendors/:id           # Get single vendor
POST   /api/vendors/register      # Register as vendor
PUT    /api/vendors/:id           # Update vendor profile
```

### Categories
```http
GET    /api/categories            # List all categories
GET    /api/categories/:id        # Get single category
```

### Orders
```http
GET    /api/orders                # List user orders
GET    /api/orders/:id            # Get order details
POST   /api/orders                # Create new order
PUT    /api/orders/:id/status     # Update order status
```

---

## 👨‍💻 Contributing / المساهمة

نرحب بمساهماتكم! / We welcome contributions!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License / الترخيص

This project is licensed under the MIT License.

---

## 👤 Author / المؤلف

**حسن منصور الحراک / Hassan Mansour Al-Harrak**

- GitHub: [@carloslopes30033](https://github.com/carloslopes30033)
- Email: admin@atadna.com

---

## 🙏 Acknowledgments / شكر وتقدير

- Next.js Team
- PostgreSQL Community
- Directus Team
- Docker Community

---

<div align="center">

**Made with ❤️ for the Middle East**

**صُنع بحب ❤️ للشرق الأوسط**

</div>

B2B Wholesale Marketplace
