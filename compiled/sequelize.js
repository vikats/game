"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function default_1(app) {
    const sequelizeOptions = {
        host: '127.0.0.1',
        dialect: 'mysql',
        port: 3353,
        logging: false,
        define: {
            freezeTableName: true,
            charset: 'utf8mb4',
        },
        pool: {
            max: 20,
            min: 0,
            idle: 20000,
        },
    };
    const sequelize = new sequelize_1.Sequelize('game', 'root', 'pass', sequelizeOptions);
    app.set('dbConnection', sequelize);
    const { models } = sequelize;
    Object.keys(models).forEach(name => {
        const model = models[name];
        model.associate(models);
    });
    sequelize.sync({ force: true });
}
exports.default = default_1;
//# sourceMappingURL=sequelize.js.map