const crypto = require('crypto');
const key = process.env.ENCRYPTION_KEY;
const iv = crypto.randomBytes(16);

// Encryption
// Uses a secret, 32-bit key declared in .env
module.exports.encrypt = encrypt = (text) => {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}