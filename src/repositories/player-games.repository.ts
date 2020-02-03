import { Model } from 'sequelize';

import { GAME_STATUS } from '../constants';
const { INITIATED } = GAME_STATUS;

export class PlayerGames extends Model {
  public static readonly primaryKeyAttribute = 'id';

  public id!: number;
  public status!: GAME_STATUS;
  public playerId!: number;
  public firstCard!: string;
  public secondCard!: string;
  public betAmount!: string;
  public prediction!: string;
  public gameId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    PlayerGames.belongsTo(models.games, { targetKey: 'id' });
  }

  public static getInitiatedGame(playerId: number) {
    return this.findOne({
      raw: true,
      attributes: ['id', 'status', 'firstCard', 'betAmount', 'secondCard'],
      where: {
        playerId,
        status: INITIATED,
      }
    })
  }

  public static updateGameById(id: string, dataToUpdate: object) {
    return this.update(dataToUpdate, { where: { id } });
  }
}
