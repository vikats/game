import { Model } from 'sequelize';

import { GameStatus } from '../constants';

const { INITIATED } = GameStatus;

export class PlayerGames extends Model {
  public static readonly primaryKeyAttribute = 'id';

  public id!: number;
  public status!: GameStatus;
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

  public static getInitiatedGames(playerId: number) {
    return this.findOne({
      raw: true,
      attributes: ['status', 'firstCard', 'betAmount', 'secondCard'],
      where: {
        playerId,
        status: INITIATED,
      }
    })
  }
}
