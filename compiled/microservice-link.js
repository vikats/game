"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const crypto_1 = __importDefault(require("crypto"));
const cryptoValue = {
    alg: 'aes-256-cbc',
    key: 'uxrywmqxyigfcjndtgmbbsnzlkegjuso',
    salt: 'kzqwootmgxudutze'
};
const microserviceName = 'game-service';
class MicroserviceLink {
    prepareOptions(target, body) {
        return {
            headers: {
                microserviceHash: this.createHash()
            },
            url: `http://127.0.0.1:3001/${target}`,
            body,
            json: true,
        };
    }
    createHash() {
        const { alg, key, salt } = cryptoValue;
        const cipher = crypto_1.default.createCipheriv(alg, Buffer.from(key), Buffer.from(salt));
        const text = JSON.stringify({
            createdAt: Date.now(),
            microserviceName,
        });
        return cipher.update(text, 'utf8', 'hex').concat(cipher.final('hex'));
    }
    verifyPlayerOneTimeToken(body) {
        const target = 'tokens/verify';
        const options = this.prepareOptions(target, body);
        return new Promise((resolve, reject) => request_1.default.post(options, (err, res, body) => err ? reject(err) : resolve(body)));
    }
}
const microserviceLink = new MicroserviceLink();
exports.microserviceLink = microserviceLink;
//# sourceMappingURL=microservice-link.js.map