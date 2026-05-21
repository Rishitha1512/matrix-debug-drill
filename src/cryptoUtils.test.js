const { hashValue, encryptValue, decryptValue } = require('./cryptoUtils');

test('hashValue returns consistent hash', () => {
  expect(hashValue('hello')).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
});

test('encryptValue and decryptValue are inverse operations', () => {
  const original = 'sensitive data';
  const key = 'testkey123';
  const encrypted = encryptValue(original, key);
  const decrypted = decryptValue(encrypted, key);
  expect(decrypted).toBe(original);
});
