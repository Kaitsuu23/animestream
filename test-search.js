// Test search API
const axios = require('axios');

const BASE_URL = 'https://www.sankavollerei.com/anime';

async function testSearch(keyword) {
  console.log(`\n🔍 Testing search for: "${keyword}"`);
  console.log('=' .repeat(50));
  
  try {
    const url = `${BASE_URL}/search/${encodeURIComponent(keyword)}`;
    console.log(`📡 URL: ${url}`);
    
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    console.log(`✅ Status: ${response.status}`);
    console.log(`📦 Response data structure:`);
    console.log(JSON.stringify(response.data, null, 2));
    
    // Try to find the results array
    let results = [];
    if (response.data.data) {
      results = response.data.data.results || response.data.data.anime || response.data.data;
    } else if (response.data.results) {
      results = response.data.results;
    } else if (response.data.anime) {
      results = response.data.anime;
    } else if (Array.isArray(response.data)) {
      results = response.data;
    }
    
    console.log(`\n📊 Results found: ${Array.isArray(results) ? results.length : 'Not an array'}`);
    
    if (Array.isArray(results) && results.length > 0) {
      console.log(`\n🎬 First result:`);
      console.log(JSON.stringify(results[0], null, 2));
    }
    
  } catch (error) {
    console.error(`❌ Error:`, error.message);
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data:`, error.response.data);
    }
  }
}

// Test multiple keywords
async function runTests() {
  await testSearch('maou');
  await testSearch('naruto');
  await testSearch('one piece');
}

runTests();
