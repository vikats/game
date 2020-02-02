"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const games_1 = __importDefault(require("./games"));
const url = '/api/v1/games';
function setUpRoutes(app) {
    app.use(url, middlewares_1.isAuth);
    app.use(url, games_1.default);
}
exports.default = setUpRoutes;
//# sourceMappingURL=index.js.map