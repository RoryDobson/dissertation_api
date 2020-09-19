const crypto = require('crypto');
const key = process.env.ENCRYPTION_KEY;
const iv = crypto.randomBytes(16);

// Decryption
// Decrypts anything encrypted by the encrypt function
module.exports.decrypt = decrypt = (text) => {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}