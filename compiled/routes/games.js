"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_1 = __importDefault(require("../app"));
const constants_1 = require("../constants");
const { PLAYER_ALREADY_INITIATED_GAME } = constants_1.Errors;
const router = express_1.Router();
router.route('/authenticate')
    .post(authenticate);
async function authenticate(req, res) {
    const { models } = app_1.default.get('dbConnection');
    const playerDetails = {};
    const { message, playerId } = playerDetails;
    if (message) {
        return res.status(400).send({ message });
    }
    const game = await models.playerGames.getInitiatedGames(playerId);
    if (game) {
        return res.status(400).send(Object.assign(Object.assign({ message: PLAYER_ALREADY_INITIATED_GAME }, playerDetails), game));
    }
}
exports.default = router;
//# sourceMappingURL=games.js.map