"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const repositories_1 = require("../repositories");
exports.default = (app) => {
    const sequelize = app.get('dbConnection');
    repositories_1.Games.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    }, {
        sequelize,
        tableName: 'games',
        modelName: 'games',
    });
    return repositories_1.Games;
};
//# sourceMappingURL=games.model.js.map