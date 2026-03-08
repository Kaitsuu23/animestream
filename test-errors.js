/**
 * Test Error Handling
 * Script untuk testing berbagai error scenarios
 */

const axios = require('axios');

const BASE_URL = 'https://www.sankavollerei.com/anime';
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testError(name, testFn) {
  try {
    log(`\n🧪 Testing: ${name}`, 'blue');
    await testFn();
  } catch (error) {
    log(`❌ Test failed: ${error.message}`, 'red');
  }
}

async function runTests() {
  log('='.repeat(60), 'yellow');
  log('ERROR HANDLING TESTS', 'yellow');
  log('='.repeat(60), 'yellow');

  // Test 1: 404 Not Found
  await testError('404 - Not Found', async () => {
    try {
      await axios.get(`${BASE_URL}/halaman-tidak-ada`);
      log('❌ Should have returned 404', 'red');
    } catch (error) {
      if (error.response?.status === 404) {
        log('✅ 404 page returned correctly', 'green');
        log(`   Content-Type: ${error.response.headers['content-type']}`, 'blue');
      } else {
        log(`❌ Expected 404, got ${error.response?.status}`, 'red');
      }
    }
  });

  // Test 2: Valid API endpoint
  await testError('Valid API - Home', async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/home`, { timeout: 10000 });
      if (response.status === 200) {
        log('✅ API home endpoint working', 'green');
        log(`   Data received: ${JSON.stringify(response.data).substring(0, 100)}...`, 'blue');
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        log('⚠️  API timeout (expected if API is slow)', 'yellow');
      } else if (error.response?.status === 503) {
        log('⚠️  API unavailable (503)', 'yellow');
      } else {
        log(`❌ Unexpected error: ${error.message}`, 'red');
      }
    }
  });

  // Test 3: API with invalid slug
  await testError('API - Invalid Anime Slug', async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/anime/invalid-slug-12345`);
      log(`⚠️  Got response: ${response.status}`, 'yellow');
    } catch (error) {
      if (error.response?.status >= 400) {
        log(`✅ Error handled correctly: ${error.response.status}`, 'green');
        if (error.response.data) {
          log(`   Error message: ${error.response.data.message || error.response.data.error}`, 'blue');
        }
      } else {
        log(`❌ Unexpected error: ${error.message}`, 'red');
      }
    }
  });

  // Test 4: Timeout simulation
  await testError('API - Timeout', async () => {
    try {
      await axios.get(`${BASE_URL}/api/home`, { timeout: 1 });
      log('❌ Should have timed out', 'red');
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        log('✅ Timeout handled correctly', 'green');
      } else {
        log(`⚠️  Different error: ${error.message}`, 'yellow');
      }
    }
  });

  // Test 5: Check error pages exist
  await testError('Error Pages - File Check', async () => {
    const errorPages = ['404', '403', '500', '502', '503', '504'];
    const fs = require('fs');
    const path = require('path');
    
    for (const code of errorPages) {
      const filePath = path.join(__dirname, 'public', `${code}.html`);
      if (fs.existsSync(filePath)) {
        log(`✅ ${code}.html exists`, 'green');
      } else {
        log(`❌ ${code}.html missing`, 'red');
      }
    }
  });

  // Test 6: Server error handling
  await testError('Server - Error Middleware', async () => {
    try {
      // Try to access a route that might trigger server error
      await axios.get(`${BASE_URL}/api/invalid-endpoint`);
    } catch (error) {
      if (error.response?.status === 404) {
        log('✅ 404 handled by API routes', 'green');
      } else if (error.response?.status === 500) {
        log('✅ 500 error caught by middleware', 'green');
      } else {
        log(`⚠️  Got status: ${error.response?.status}`, 'yellow');
      }
    }
  });

  // Test 7: CORS handling
  await testError('CORS - Cross-Origin Request', async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/home`, {
        headers: {
          'Origin': 'http://example.com'
        }
      });
      const corsHeader = response.headers['access-control-allow-origin'];
      if (corsHeader) {
        log(`✅ CORS enabled: ${corsHeader}`, 'green');
      } else {
        log('⚠️  CORS header not found', 'yellow');
      }
    } catch (error) {
      log(`⚠️  CORS test error: ${error.message}`, 'yellow');
    }
  });

  // Summary
  log('\n' + '='.repeat(60), 'yellow');
  log('TESTS COMPLETED', 'yellow');
  log('='.repeat(60), 'yellow');
  log('\n💡 Tips:', 'blue');
  log('   - Make sure server is running on port 3000', 'blue');
  log('   - Some tests may fail if external API is down', 'blue');
  log('   - Check browser console for client-side errors', 'blue');
  log('   - Visit http://localhost:3000/not-found to see 404 page\n', 'blue');
}

// Run tests
runTests().catch(error => {
  log(`\n❌ Test suite failed: ${error.message}`, 'red');
  process.exit(1);
});
