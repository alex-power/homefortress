// Script to start the Express.js backend server
const path = require('path');
const { spawn } = require('child_process');

// Configure environment variables
const env = {
  ...process.env,
  NODE_ENV: 'development',
  PORT: process.env.PORT || '8080',
  PIHOLE_API_BASE: process.env.PIHOLE_API_BASE || 'http://localhost/admin/api.php',
  PIHOLE_AUTH_TOKEN: process.env.PIHOLE_AUTH_TOKEN || '',
  PIHOLE_FTL_SOCKET: process.env.PIHOLE_FTL_SOCKET || '/run/pihole-FTL.sock',
  DB_PATH: process.env.DB_PATH || path.resolve(__dirname, 'data/pihole-enhanced.sqlite')
};

// Create the data directory if it doesn't exist
const fs = require('fs');
const dataDir = path.resolve(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  console.log(`Creating data directory: ${dataDir}`);
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log('Starting Express.js backend server with the following configuration:');
console.log(`  PORT: ${env.PORT}`);
console.log(`  PIHOLE_API_BASE: ${env.PIHOLE_API_BASE}`);
console.log(`  PIHOLE_FTL_SOCKET: ${env.PIHOLE_FTL_SOCKET}`);
console.log(`  DB_PATH: ${env.DB_PATH}`);

// Start the server
const server = spawn('node', ['src/app.js'], { 
  env,
  stdio: 'inherit'
});

server.on('close', (code) => {
  console.log(`Express.js server exited with code ${code}`);
});

// Handle termination signals
process.on('SIGINT', () => {
  console.log('Shutting down Express.js server...');
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Shutting down Express.js server...');
  server.kill('SIGTERM');
});

console.log('Express.js backend server started! Press Ctrl+C to stop.'); 