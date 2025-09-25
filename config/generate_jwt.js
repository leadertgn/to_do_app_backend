const crypto = require("crypto");
const bits = 128;
const jwt_secret = crypto.randomBytes(bits).toString('hex');
console.log(`Clé secrète : ${jwt_secret}`);
