"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Games extends sequelize_1.Model {
    static associate(models) {
        Games.hasMany(models.playerGames, {
            sourceKey: 'id',
            foreignKey: 'gameId',
        });
    }
}
exports.Games = Games;
Games.primaryKeyAttribute = 'id';
//# sourceMappingURL=games.repository.js.map