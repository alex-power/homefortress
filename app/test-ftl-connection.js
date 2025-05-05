// Test script to verify connection to Pi-hole FTL
const { FTLClient } = require('./src/services/FTLClient');

// Configure socket path - adjust as needed for your environment
const socketPath = process.env.PIHOLE_FTL_SOCKET || '/run/pihole-FTL.sock';
console.log(`Attempting to connect to Pi-hole FTL socket at: ${socketPath}`);

// Create FTL client
const ftlClient = new FTLClient(socketPath);

async function testConnection() {
  try {
    // Try to connect
    console.log('Connecting to FTL socket...');
    await ftlClient.connect();
    console.log('Connection successful!');
    
    // Get version
    console.log('Getting FTL version...');
    const version = await ftlClient.getVersion();
    console.log(`FTL Version: ${version}`);
    
    // Get stats
    console.log('Getting FTL stats...');
    const stats = await ftlClient.getStats();
    console.log('Stats:', stats);
    
    // Disconnect
    await ftlClient.disconnect();
    console.log('Disconnected successfully.');
    
    return true;
  } catch (error) {
    console.error('Error connecting to Pi-hole FTL:', error.message);
    return false;
  }
}

// Run the test
testConnection()
  .then(success => {
    if (success) {
      console.log('✅ Pi-hole FTL connection test passed!');
      process.exit(0);
    } else {
      console.log('❌ Pi-hole FTL connection test failed!');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  }); 