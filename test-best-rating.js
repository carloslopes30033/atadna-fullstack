#!/usr/bin/env node

/**
 * Test the new "best rating" endpoints
 */

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

async function testBestRatingEndpoints() {
  const axios = require('axios');
  
  console.log('\n🧪 Testing Best Rating Endpoints...\n');
  console.log(`Backend URL: ${BACKEND_URL}\n`);
  
  try {
    // Test API info to see if new endpoints are listed
    console.log('1️⃣ Testing API info endpoint...');
    const apiInfo = await axios.get(`${BACKEND_URL}/api`);
    console.log('   Available endpoints:', Object.keys(apiInfo.data.endpoints));
    console.log(`   ✅ bestProduct: ${apiInfo.data.endpoints.bestProduct}`);
    console.log(`   ✅ bestVendor: ${apiInfo.data.endpoints.bestVendor}`);
    
    // Test best product endpoint
    console.log('\n2️⃣ Testing best product endpoint...');
    try {
      const bestProduct = await axios.get(`${BACKEND_URL}/api/products/best`);
      if (bestProduct.data.success && bestProduct.data.data) {
        console.log(`   ✅ Found best product: ${bestProduct.data.data.name || 'N/A'}`);
        console.log(`   Rating: ${bestProduct.data.data.rating}`);
        console.log(`   Price: $${bestProduct.data.data.price}`);
      } else {
        console.log('   ⚠️  No products found');
      }
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('   ⚠️  No products found (404 - expected if database is empty)');
      } else {
        throw error;
      }
    }
    
    // Test best vendor endpoint
    console.log('\n3️⃣ Testing best vendor endpoint...');
    try {
      const bestVendor = await axios.get(`${BACKEND_URL}/api/vendors/best`);
      if (bestVendor.data.success && bestVendor.data.data) {
        console.log(`   ✅ Found best vendor: ${bestVendor.data.data.company_name || 'N/A'}`);
        console.log(`   Rating: ${bestVendor.data.data.rating}`);
        console.log(`   Verified: ${bestVendor.data.data.is_verified}`);
      } else {
        console.log('   ⚠️  No vendors found');
      }
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('   ⚠️  No vendors found (404 - expected if database is empty)');
      } else {
        throw error;
      }
    }
    
    console.log('\n✅ All tests completed successfully!\n');
    console.log('📝 Note: 404 responses are normal if database is empty.\n');
    console.log('   To populate data, use Directus or run database seeds.\n');
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('\n❌ Error: Cannot connect to backend server.');
      console.error(`   Make sure the backend is running at ${BACKEND_URL}`);
      console.error('   Start it with: cd backend && npm run dev\n');
    } else {
      console.error('\n❌ Error:', error.response?.data || error.message);
    }
    process.exit(1);
  }
}

testBestRatingEndpoints();
