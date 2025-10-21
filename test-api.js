#!/usr/bin/env node

/**
 * Test Directus API from Frontend perspective
 */

const TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNiMDYyYjI4LWJkMWQtNDlhMi1iNzMxLWE4MGFjZmRkOWRkMSIsInJvbGUiOiIxNGU3YWEyNC1iMmUyLTRjYmYtYmI1Ny02Mjc4NjkxZGU5M2MiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTc2MTA2MzMxNywiZXhwIjoxNzYxMDY0MjE3LCJpc3MiOiJkaXJlY3R1cyJ9.oM5vHQ7dLSMJeTIgYTtK3JvYUkVYDe3WMjiMrr7M0sQ';
const DIRECTUS_URL = 'http://localhost:8055';

async function testAPI() {
  const axios = require('axios');
  
  console.log('\n🧪 Testing Directus API Integration...\n');
  
  const client = axios.create({
    baseURL: DIRECTUS_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`
    }
  });
  
  try {
    // Test products
    const products = await client.get('/items/products');
    console.log(`✅ Products: ${products.data.data.length} items`);
    if (products.data.data.length > 0) {
      console.log(`   First: ${products.data.data[0].name} - $${products.data.data[0].price}`);
    }
    
    // Test categories
    const categories = await client.get('/items/categories');
    console.log(`✅ Categories: ${categories.data.data.length} items`);
    
    // Test vendors
    const vendors = await client.get('/items/vendors');
    console.log(`✅ Vendors: ${vendors.data.data.length} items`);
    
    // Test reviews
    const reviews = await client.get('/items/reviews');
    console.log(`✅ Reviews: ${reviews.data.data.length} items`);
    
    console.log('\n✅ All API endpoints are working!\n');
    console.log('🌐 Now open: http://localhost:3000/products\n');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

testAPI();
