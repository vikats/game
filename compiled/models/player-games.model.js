"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const repositories_1 = require("../repositories");
const constants_1 = require("../constants");
const { INITIATED } = constants_1.GameStatus;
exports.default = (app) => {
    const sequelize = app.get('dbConnection');
    repositories_1.PlayerGames.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(constants_1.GameStatus)),
            allowNull: false,
            defaultValue: INITIATED,
            validate: {
                isIn: [Object.values(constants_1.GameStatus)],
            },
        },
        playerId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        firstCard: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        secondCard: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        betAmount: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        prediction: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'player_games',
        modelName: 'playerGames',
    });
    return repositories_1.PlayerGames;
};
//# sourceMappingURL=player-games.model.js.map