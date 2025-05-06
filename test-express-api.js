// Test script to verify Express.js API endpoints
const axios = require('axios');

// Configure API base URL - adjust as needed for your environment
const expressApiBase = process.env.EXPRESS_API_BASE || 'http://localhost:8080/api';

console.log(`Testing Express.js API endpoints at: ${expressApiBase}`);

async function testExpressApi() {
  try {
    // Test the Pi-hole status endpoint (public endpoint)
    console.log('\nTesting Pi-hole status endpoint...');
    const statusResponse = await axios.get(`${expressApiBase}/pihole/status`);
    console.log('Status endpoint response:', 
      statusResponse.status === 200 ? 'SUCCESS (200)' : `UNEXPECTED (${statusResponse.status})`);
    
    // Test the Pi-hole stats endpoint (public endpoint)
    console.log('\nTesting Pi-hole stats endpoint...');
    const statsResponse = await axios.get(`${expressApiBase}/pihole/stats`);
    console.log('Stats endpoint response:', 
      statsResponse.status === 200 ? 'SUCCESS (200)' : `UNEXPECTED (${statsResponse.status})`);
    
    // Test network clients endpoint (public endpoint)
    console.log('\nTesting network clients endpoint...');
    const clientsResponse = await axios.get(`${expressApiBase}/pihole/network-clients`);
    console.log('Network clients endpoint response:', 
      clientsResponse.status === 200 ? 'SUCCESS (200)' : `UNEXPECTED (${clientsResponse.status})`);
    
    // You can add more tests for other endpoints as needed
    
    return true;
  } catch (error) {
    console.error('Error testing Express.js API:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Is the Express server running?');
    }
    return false;
  }
}

// Run the test
testExpressApi()
  .then(success => {
    if (success) {
      console.log('\n✅ Express.js API test passed! The backend is properly connected to Pi-hole.');
      process.exit(0);
    } else {
      console.log('\n❌ Express.js API test failed! Check the Express server and Pi-hole connection.');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  }); 