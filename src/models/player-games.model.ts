import { DataTypes } from 'sequelize';

import { PlayerGames } from '../repositories';
import { GameStatus } from '../constants';

const { INITIATED } = GameStatus;

export default (app: any) => {
  const sequelize = app.get('dbConnection');

  PlayerGames.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(GameStatus)),
      allowNull: false,
      defaultValue: INITIATED,
      validate: {
        isIn: [Object.values(GameStatus)],
      },
    },
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstCard: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    secondCard: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    betAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    prediction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'player_games',
    modelName: 'playerGames',
  });

  return PlayerGames;
};
