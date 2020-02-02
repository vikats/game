"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const constants_1 = require("../constants");
const { INITIATED } = constants_1.GameStatus;
class PlayerGames extends sequelize_1.Model {
    static associate(models) {
        PlayerGames.belongsTo(models.games, { targetKey: 'id' });
    }
    static getInitiatedGames(playerId) {
        return this.findOne({
            raw: true,
            attributes: ['status', 'firstCard', 'betAmount'],
            where: {
                playerId,
                status: INITIATED,
            }
        });
    }
}
exports.PlayerGames = PlayerGames;
PlayerGames.primaryKeyAttribute = 'id';
//# sourceMappingURL=player-games.repository.js.map