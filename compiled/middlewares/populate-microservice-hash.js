"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const cryptoValue = {
    alg: 'aes-256-cbc',
    key: 'uxrywmqxyigfcjndtgmbbsnzlkegjuso',
    salt: 'kzqwootmgxudutze'
};
const microserviceName = 'game-service';
function populateMicroserviceHash(req, res, next) {
    const { alg, key, salt } = cryptoValue;
    const cipher = crypto_1.default.createCipheriv(alg, Buffer.from(key), Buffer.from(salt));
    const text = JSON.stringify({
        microserviceName,
        createdAt: Date.now(),
    });
    req.headers.microserviceHash = cipher.update(text, 'utf8', 'hex').concat(cipher.final('hex'));
    return next();
}
exports.default = populateMicroserviceHash;
//# sourceMappingURL=populate-microservice-hash.js.map