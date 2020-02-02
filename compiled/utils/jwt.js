"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signOptions = {
    algorithm: 'HS256',
    issuer: 'card-predictor',
    expiresIn: 60000000,
};
const key = 'dtglebplfpvqzfpwgpgywckwvuwylg';
function writeToken(userData) {
    return jsonwebtoken_1.default.sign(userData, key, signOptions);
}
exports.writeToken = writeToken;
function readToken(token) {
    return jsonwebtoken_1.default.verify(token, key);
}
exports.readToken = readToken;
//# sourceMappingURL=jwt.js.map