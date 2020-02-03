import { Application } from 'express';
import { DataTypes } from 'sequelize';

import { PlayerGames } from '../repositories';
import { GAME_STATUS } from '../constants';
const { INITIATED } = GAME_STATUS;

export default (app: Application) => {
  const sequelize = app.get('dbConnection');

  PlayerGames.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(GAME_STATUS)),
      allowNull: false,
      defaultValue: INITIATED,
      validate: {
        isIn: [Object.values(GAME_STATUS)],
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
