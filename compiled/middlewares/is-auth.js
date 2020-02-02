"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const api_1 = require("../constants/api");
function isAuth(req, res, next) {
    const { authorizedToken } = req.cookies;
    try {
        const userData = jwt_1.readToken(authorizedToken);
        res.locals.playerId = userData.playerId;
    }
    catch (e) {
        return res.sendStatus(api_1.NOT_AUTHORIZED_CODE);
    }
    return next();
}
exports.isAuth = isAuth;
//# sourceMappingURL=is-auth.js.map