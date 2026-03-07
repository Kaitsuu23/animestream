const axios = require('axios');

const BASE_URL = 'https://www.sankavollerei.com/anime';

async function testEndpoints() {
  console.log('Testing Otakudesu API endpoints...\n');
  
  const endpoints = [
    { name: 'Home', url: `${BASE_URL}/home` },
    { name: 'Unlimited', url: `${BASE_URL}/unlimited` },
    { name: 'Ongoing', url: `${BASE_URL}/ongoing-anime?page=1` },
    { name: 'Complete', url: `${BASE_URL}/complete-anime?page=1` },
    { name: 'Schedule', url: `${BASE_URL}/schedule` },
    { name: 'Genres', url: `${BASE_URL}/genre` }
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint.name}...`);
      const response = await axios.get(endpoint.url, { timeout: 10000 });
      console.log(`✓ ${endpoint.name}: SUCCESS`);
      console.log(`  Status: ${response.status}`);
      console.log(`  Data keys:`, Object.keys(response.data));
      
      // Show sample data structure
      if (response.data.data) {
        console.log(`  Data.data keys:`, Object.keys(response.data.data));
      }
      console.log('');
    } catch (error) {
      console.log(`✗ ${endpoint.name}: FAILED`);
      console.log(`  Error: ${error.message}`);
      if (error.response) {
        console.log(`  Status: ${error.response.status}`);
      }
      console.log('');
    }
  }
}

testEndpoints();
