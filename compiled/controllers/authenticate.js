"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const microservice_link_1 = require("../modules/microservice-link");
const jwt_1 = require("../utils/jwt");
const api_1 = require("../constants/api");
function authenticate(req, res) {
    const { models } = app_1.default.get('dbConnection');
    const { token } = req.body;
    if (!token) {
        return res.sendStatus(api_1.BAD_REQUEST_CODE);
    }
    microservice_link_1.verifyOneTimeToken(token)
        .then(async ({ body }) => {
        const { playerId } = body;
        const game = await models.playerGames.getInitiatedGames(playerId);
        if (game) {
            return res.status(api_1.BAD_REQUEST_CODE)
                .send(Object.assign(Object.assign({ message: api_1.PLAYER_ALREADY_INITIATED_GAME }, body), game));
        }
        res.cookie('authorizedToken', jwt_1.writeToken(body));
        return res.send(body);
    })
        .catch(() => res.sendStatus(api_1.BAD_REQUEST_CODE));
}
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map