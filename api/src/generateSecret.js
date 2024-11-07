const crypto = require('crypto');

// Generar una clave secreta de 32 bytes
const secret = crypto.randomBytes(32).toString('hex');
console.log(secret);
