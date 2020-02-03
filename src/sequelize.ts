import { Application } from 'express';
import { Sequelize, Options } from 'sequelize';
import config from 'config';

const { DB_URI } = process.env;

export default function(app: Application): void {
  const { uri } = config.get('database');

  const sequelizeOptions: Options = {
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

  const sequelize: Sequelize = new Sequelize(DB_URI || uri, sequelizeOptions);

  app.set('dbConnection', sequelize);

  sequelize.sync({ force: true });
}
