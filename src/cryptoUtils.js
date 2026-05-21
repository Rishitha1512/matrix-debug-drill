const crypto = require('crypto');

function hashValue(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function encryptValue(text, key) {
  // BUG: createCipher was removed in Node 22
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptValue(encrypted, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { hashValue, encryptValue, decryptValue };
