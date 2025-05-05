// Test script to verify connection to Pi-hole HTTP API
const axios = require('axios');

// Configure API base URL - adjust as needed for your environment
const baseUrl = process.env.PIHOLE_API_BASE || 'http://localhost/admin/api.php';
const authToken = process.env.PIHOLE_AUTH_TOKEN || '';

console.log(`Attempting to connect to Pi-hole API at: ${baseUrl}`);

async function testHttpApi() {
  try {
    // Test summary endpoint (doesn't require authentication)
    console.log('Getting Pi-hole summary...');
    const summaryResponse = await axios.get(`${baseUrl}?summary`);
    console.log('Summary:', summaryResponse.data);
    
    // Test query types (doesn't require authentication)
    console.log('Getting Pi-hole query types...');
    const queryTypesResponse = await axios.get(`${baseUrl}?getQueryTypes`);
    console.log('Query types available:', queryTypesResponse.data && typeof queryTypesResponse.data === 'object');
    
    // Test an endpoint that requires authentication (if token is provided)
    if (authToken) {
      console.log('Auth token provided, testing authenticated endpoint...');
      const listsResponse = await axios.get(`${baseUrl}?list=black&auth=${authToken}`);
      console.log('Blacklist access successful:', listsResponse.data && typeof listsResponse.data === 'object');
    } else {
      console.log('No auth token provided, skipping authenticated endpoints');
    }
    
    return true;
  } catch (error) {
    console.error('Error connecting to Pi-hole HTTP API:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return false;
  }
}

// Run the test
testHttpApi()
  .then(success => {
    if (success) {
      console.log('✅ Pi-hole HTTP API connection test passed!');
      process.exit(0);
    } else {
      console.log('❌ Pi-hole HTTP API connection test failed!');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  }); 