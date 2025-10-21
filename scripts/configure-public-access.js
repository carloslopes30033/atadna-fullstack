/**
 * Configure Directus Public Permissions
 * Allows public read access to products, categories, vendors, and reviews
 */

const axios = require('axios');

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = process.env.DIRECTUS_ADMIN_EMAIL || 'admin@atadna.com';
const ADMIN_PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD || 'Atadna@Admin2025';

async function configurePublicPermissions() {
  console.log('🔧 Configuring Directus Public Permissions...\n');

  try {
    // Step 1: Login as admin
    console.log('1️⃣ Logging in as admin...');
    const loginResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    const accessToken = loginResponse.data.data.access_token;
    console.log('✅ Logged in successfully\n');

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    // Step 2: Configure public permissions (role = null means public)
    console.log('2️⃣ Configuring public permissions (role = null)...\n');

    // Step 3: Configure permissions for each collection
    const collections = [
      { collection: 'products', fields: ['*'] },
      { collection: 'categories', fields: ['*'] },
      { collection: 'vendors', fields: ['*'] },
      { collection: 'reviews', fields: ['*'] },
    ];

    console.log('3️⃣ Setting up public read permissions...\n');

    for (const { collection, fields } of collections) {
      try {
        // Check if permission already exists (role = null means public)
        const existingPerms = await axios.get(
          `${DIRECTUS_URL}/permissions?filter[role][_null]=true&filter[collection][_eq]=${collection}`,
          { headers }
        );

        if (existingPerms.data.data.length > 0) {
          // Update existing permission
          const permId = existingPerms.data.data[0].id;
          await axios.patch(
            `${DIRECTUS_URL}/permissions/${permId}`,
            {
              role: null,
              collection: collection,
              action: 'read',
              fields: fields,
              permissions: {},
              validation: {},
            },
            { headers }
          );
          console.log(`   ✅ Updated permission for ${collection}`);
        } else {
          // Create new permission
          await axios.post(
            `${DIRECTUS_URL}/permissions`,
            {
              role: null,
              collection: collection,
              action: 'read',
              fields: fields,
              permissions: {},
              validation: {},
            },
            { headers }
          );
          console.log(`   ✅ Created permission for ${collection}`);
        }
      } catch (err) {
        console.log(`   ⚠️  Error setting permission for ${collection}:`, err.response?.data?.errors?.[0]?.message || err.message);
      }
    }

    console.log('\n4️⃣ Testing public access...\n');

    // Test public access (without auth)
    for (const { collection } of collections) {
      try {
        const testResponse = await axios.get(`${DIRECTUS_URL}/items/${collection}?limit=1`);
        console.log(`   ✅ ${collection}: ${testResponse.data.data.length} items accessible`);
      } catch (err) {
        console.log(`   ❌ ${collection}: ${err.response?.data?.errors?.[0]?.message || err.message}`);
      }
    }

    console.log('\n✅ Public permissions configured successfully!\n');
    console.log('📌 Collections accessible without authentication:');
    console.log('   - products');
    console.log('   - categories');
    console.log('   - vendors');
    console.log('   - reviews\n');

  } catch (error) {
    console.error('❌ Error:', error.response?.data?.errors?.[0]?.message || error.message);
    process.exit(1);
  }
}

configurePublicPermissions();
