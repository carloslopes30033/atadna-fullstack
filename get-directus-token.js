const axios = require('axios');

async function getToken() {
  try {
    const response = await axios.post('http://localhost:8055/auth/login', {
      email: 'admin@atadna.com',
      password: 'Atadna@Admin2025'
    });
    
    const token = response.data.data.access_token;
    console.log('\n✅ Successfully logged in to Directus!');
    console.log('\n📋 Add this to frontend/.env.local:');
    console.log(`NEXT_PUBLIC_DIRECTUS_TOKEN=${token}`);
    console.log('\n⚠️  Note: This token expires in 15 minutes.');
    console.log('For production, use Directus Static Tokens feature.\n');
    
    // Test the token
    const testResponse = await axios.get('http://localhost:8055/items/products', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`✅ Token works! Found ${testResponse.data.data.length} products\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

getToken();
