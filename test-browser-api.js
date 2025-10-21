#!/usr/bin/env node

/**
 * Test Frontend API Call from Server-Side
 * Simulates what the browser does
 */

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNiMDYyYjI4LWJkMWQtNDlhMi1iNzMxLWE4MGFjZmRkOWRkMSIsInJvbGUiOiIxNGU3YWEyNC1iMmUyLTRjYmYtYmI1Ny02Mjc4NjkxZGU5M2MiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTc2MTA2MzY3NywiZXhwIjoxNzYxMDY0NTc3LCJpc3MiOiJkaXJlY3R1cyJ9.BayUZXt-pTml8u0tXP172m7Ug024zS4iWA0lETT30Ys';

async function testFromBrowser() {
  const axios = require('axios');
  
  console.log('\n🧪 Testing Directus API from Browser perspective...\n');
  
  try {
    // Simulate browser call
    const response = await axios.get('http://localhost:8055/items/products', {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000'
      }
    });
    
    console.log(`✅ Success! Got ${response.data.data.length} products`);
    console.log(`📦 First product: ${response.data.data[0].name}`);
    console.log(`💰 Price: $${response.data.data[0].price}`);
    console.log('\n✅ Frontend should be able to load products!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    console.log('\n❗ This is the same error the browser is getting\n');
  }
}

testFromBrowser();
