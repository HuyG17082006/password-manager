import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

const KEY = Buffer.from(process.env.AES_KEY, 'hex');

if (KEY.length !== 32)
    throw new Error('AES_KEY must be 32 bytes (64 hex characters).');

const encrypt = (plaintext) => {

    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

    const encrypted = Buffer.concat([
        cipher.update(plaintext, 'utf8'),
        cipher.final()
    ]);

    const authTag = cipher.getAuthTag();

    return {
        encrypted: encrypted.toString('base64'),
        iv,
        authTag
    };
};

const decrypt = ({ encrypted, iv, authTag }) => {

    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);

    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encrypted, 'base64')),
        decipher.final()
    ]);

    return decrypted.toString('utf8');
};

export default {
    encrypt,
    decrypt
};