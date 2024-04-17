// config/config.js
const crypto = require('crypto');

// Generate a random buffer (e.g., 64 bytes) and convert it to a hexadecimal string
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated SECRET_KEY:', secretKey);

module.exports = {
  SECRET_KEY: process.env.SECRET_KEY, // Change this to a strong, secret key
};

