"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const crypto_1 = __importDefault(require("crypto"));
const api_1 = require("../constants/api");
const cryptoValue = {
    alg: 'aes-256-cbc',
    key: 'uxrywmqxyigfcjndtgmbbsnzlkegjuso',
    salt: 'kzqwootmgxudutze'
};
const microserviceName = 'game-service';
function createAuthToken() {
    const { alg, key, salt } = cryptoValue;
    const cipher = crypto_1.default.createCipheriv(alg, Buffer.from(key), Buffer.from(salt));
    const text = JSON.stringify({
        createdAt: Date.now(),
        microserviceName,
    });
    return cipher.update(text, 'utf8', 'hex').concat(cipher.final('hex'));
}
function verifyOneTimeToken(token) {
    const target = `tokens/verify`;
    const options = {
        headers: {
            microserviceHash: createAuthToken(),
        },
        body: {
            token,
        },
        json: true,
        url: `http://127.0.0.1:3001/${target}`,
    };
    return new Promise((resolve, reject) => {
        request_1.default.post(options, (err, res) => {
            if (err) {
                return reject(err);
            }
            if (res && res.statusCode !== api_1.STATUS_OK_CODE) {
                return reject(res);
            }
            return resolve(res);
        });
    });
}
exports.verifyOneTimeToken = verifyOneTimeToken;
//# sourceMappingURL=microservice-link.js.map