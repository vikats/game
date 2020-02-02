"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const api_1 = require("../constants/api");
const cards_1 = require("../utils/cards");
async function startGame(req, res) {
    const { models } = app_1.default.get('dbConnection');
    const { playerId } = res.locals;
    const { betAmount } = req.body;
    const game = await models.playerGames.getInitiatedGames(playerId);
    if (game) {
        return res.status(api_1.BAD_REQUEST_CODE)
            .send(Object.assign({ message: api_1.PLAYER_ALREADY_INITIATED_GAME }, game));
    }
    const { name: firstCard } = cards_1.generateRandomCardFromDeck();
    await models.playerGames.create({
        firstCard,
        betAmount,
        playerId
    });
    return res.send({ card: firstCard });
}
exports.startGame = startGame;
//# sourceMappingURL=start-game.js.map