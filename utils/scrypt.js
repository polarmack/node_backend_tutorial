const Scrypt = require('scrypt-nonce-wrapper');
const scrypt = new Scrypt({ salt: process.env.HASH_SALT });

module.exports = scrypt;
