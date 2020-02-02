import { Sequelize, Options } from 'sequelize';

export default function(app: any): void {
  const sequelizeOptions: Options = {
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

  const sequelize: Sequelize = new Sequelize('game', 'root', 'pass', sequelizeOptions);

  app.set('dbConnection', sequelize);

  sequelize.sync({ force: true });
}
