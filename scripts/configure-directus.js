#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 DIRECTUS AUTO-CONFIGURATION SCRIPT
 * ═══════════════════════════════════════════════════════════════════════════
 * Automatically configures Directus CMS for Atadna B2B Marketplace
 * Date: 2025-10-21
 * ═══════════════════════════════════════════════════════════════════════════
 */

const https = require('https');
const http = require('http');

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = process.env.DIRECTUS_EMAIL || 'admin@atadna.com';
const ADMIN_PASSWORD = process.env.DIRECTUS_PASSWORD || 'Atadna@Admin2025';

let authToken = '';

// ═══════════════════════════════════════════════════════════════════════════
// HTTP REQUEST HELPER
// ═══════════════════════════════════════════════════════════════════════════

async function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, DIRECTUS_URL);
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (authToken) {
      options.headers['Authorization'] = `Bearer ${authToken}`;
    }

    const client = url.protocol === 'https:' ? https : http;
    const req = client.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const response = body ? JSON.parse(body) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(response);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${JSON.stringify(response)}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// AUTHENTICATION
// ═══════════════════════════════════════════════════════════════════════════

async function login() {
  console.log('\n🔐 Authenticating with Directus...');
  try {
    const response = await makeRequest('POST', '/auth/login', {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    authToken = response.data.access_token;
    console.log('✅ Authentication successful!');
    return true;
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// SETTINGS CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

async function configureSettings() {
  console.log('\n⚙️  Configuring Directus settings...');
  
  try {
    await makeRequest('PATCH', '/settings', {
      project_name: 'عتادنا (Atadna)',
      project_descriptor: 'B2B Wholesale Marketplace',
      project_url: 'http://localhost:3000',
      default_language: 'ar-SA',
      project_color: '#3B82F6',
      public_foreground: '#FFFFFF',
      public_background: '#F3F4F6',
      public_note: 'منصة التجارة بالجملة للشرق الأوسط'
    });
    
    console.log('✅ Settings configured');
  } catch (error) {
    console.error('⚠️  Settings configuration failed:', error.message);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// COLLECTIONS VISIBILITY
// ═══════════════════════════════════════════════════════════════════════════

async function updateCollectionVisibility() {
  console.log('\n📊 Configuring collection visibility...');
  
  const collections = [
    { collection: 'users', icon: 'people', note: 'User accounts' },
    { collection: 'vendors', icon: 'store', note: 'Vendor information' },
    { collection: 'categories', icon: 'category', note: 'Product categories' },
    { collection: 'products', icon: 'inventory_2', note: 'Product catalog' },
    { collection: 'orders', icon: 'shopping_cart', note: 'Customer orders' },
    { collection: 'order_items', icon: 'receipt_long', note: 'Order line items' },
    { collection: 'reviews', icon: 'star', note: 'Product reviews' },
    { collection: 'carts', icon: 'shopping_bag', note: 'Shopping carts' }
  ];

  for (const col of collections) {
    try {
      await makeRequest('PATCH', `/collections/${col.collection}`, {
        meta: {
          icon: col.icon,
          note: col.note,
          hidden: false,
          singleton: false
        }
      });
      console.log(`  ✅ ${col.collection}`);
    } catch (error) {
      console.log(`  ⚠️  ${col.collection}: ${error.message}`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║              🎯 عتادنا (ATADNA) - DIRECTUS AUTO-CONFIG                    ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
  `);

  // Step 1: Login
  const authenticated = await login();
  if (!authenticated) {
    console.error('\n❌ Cannot proceed without authentication');
    process.exit(1);
  }

  // Step 2: Configure Settings
  await configureSettings();

  // Step 3: Update Collection Visibility
  await updateCollectionVisibility();

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Directus configuration completed!

🌐 Access Directus: ${DIRECTUS_URL}
📧 Email: ${ADMIN_EMAIL}
🔑 Password: ${ADMIN_PASSWORD}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
}

// Run the script
main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
