import { Application } from 'express';

import playerGamesModel from './player-games.model';

export default (app: Application): void => {
  playerGamesModel(app);
}
