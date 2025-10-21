// ═══════════════════════════════════════════════════════════════════════════
// 🚀 ATADNA BACKEND - Main Entry Point
// ═══════════════════════════════════════════════════════════════════════════
// Project: عتادنا (Atadna) B2B Wholesale Marketplace
// Backend API with Express + TypeScript + PostgreSQL + Redis
// ═══════════════════════════════════════════════════════════════════════════

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createClient } from 'redis';
import { Pool } from 'pg';

// Load environment variables
dotenv.config();

// ───────────────────────────────────────────────────────────────────────────
// 📦 Initialize Express App
// ───────────────────────────────────────────────────────────────────────────

const app: Application = express();
const PORT = process.env.PORT || 4000;

// ───────────────────────────────────────────────────────────────────────────
// 🔧 Middleware
// ───────────────────────────────────────────────────────────────────────────

app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ───────────────────────────────────────────────────────────────────────────
// 🗄️ Database Connection (PostgreSQL)
// ───────────────────────────────────────────────────────────────────────────

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  console.log('✅ PostgreSQL connected');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL error:', err);
});

// ───────────────────────────────────────────────────────────────────────────
// 🔴 Redis Connection
// ───────────────────────────────────────────────────────────────────────────

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis error:', err);
});

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();

// ───────────────────────────────────────────────────────────────────────────
// 🛣️ API Routes
// ───────────────────────────────────────────────────────────────────────────

// Health Check
app.get('/health', async (req: Request, res: Response) => {
  try {
    // Check PostgreSQL
    const dbResult = await pool.query('SELECT NOW()');
    const dbStatus = dbResult.rows[0] ? 'connected' : 'disconnected';

    // Check Redis
    const redisStatus = redisClient.isOpen ? 'connected' : 'disconnected';

    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus,
        redis: redisStatus,
      },
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// API Info
app.get('/api', (req: Request, res: Response) => {
  res.json({
    name: 'عتادنا (Atadna) API',
    version: '1.0.0',
    description: 'B2B Wholesale Marketplace API for Middle East',
    endpoints: {
      health: '/health',
      products: '/api/products',
      vendors: '/api/vendors',
      orders: '/api/orders',
      users: '/api/users',
    },
    documentation: '/api/docs',
  });
});

// ───────────────────────────────────────────────────────────────────────────
// 🛍️ Products Routes
// ───────────────────────────────────────────────────────────────────────────

app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, category, vendor, search } = req.query;
    
    let query = 'SELECT * FROM products WHERE status = $1';
    const params: any[] = ['active'];
    let paramCount = 1;

    if (category) {
      paramCount++;
      query += ` AND category_id = $${paramCount}`;
      params.push(category);
    }

    if (vendor) {
      paramCount++;
      query += ` AND vendor_id = $${paramCount}`;
      params.push(vendor);
    }

    if (search) {
      paramCount++;
      query += ` AND (name ILIKE $${paramCount} OR name_ar ILIKE $${paramCount} OR name_fa ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    query += ' ORDER BY created_at DESC';
    query += ` LIMIT ${limit} OFFSET ${(Number(page) - 1) * Number(limit)}`;

    const result = await pool.query(query, params);

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: result.rowCount || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
    });
  }
});

// Get single product
app.get('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1 AND status = $2',
      [id, 'active']
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product',
    });
  }
});

// ───────────────────────────────────────────────────────────────────────────
// 🏢 Vendors Routes
// ───────────────────────────────────────────────────────────────────────────

app.get('/api/vendors', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const result = await pool.query(
      'SELECT * FROM vendors WHERE is_verified = $1 ORDER BY rating DESC LIMIT $2 OFFSET $3',
      [true, limit, (Number(page) - 1) * Number(limit)]
    );

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: result.rowCount || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch vendors',
    });
  }
});

// ───────────────────────────────────────────────────────────────────────────
// 📂 Categories Routes
// ───────────────────────────────────────────────────────────────────────────

app.get('/api/categories', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM categories WHERE is_active = $1 ORDER BY sort_order ASC',
      [true]
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
    });
  }
});

// ───────────────────────────────────────────────────────────────────────────
// ❌ Error Handling Middleware
// ───────────────────────────────────────────────────────────────────────────

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// ───────────────────────────────────────────────────────────────────────────
// 🚀 Start Server
// ───────────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🚀 عتادنا (ATADNA) Backend API Server');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`📍 Server running on: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📅 Started at: ${new Date().toISOString()}`);
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await pool.end();
  await redisClient.quit();
  process.exit(0);
});

export default app;
