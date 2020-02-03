import { Application } from 'express';
import { NOT_FOUND } from 'http-status-codes';

import { API_PREFIX } from '../constants';

import {
  isAuth,
  checkOneTimeToken
} from '../middlewares';

import { authenticate } from './authenticate';
import { startGame } from './start-game';
import { endGame } from './end-game';

export default (app: Application): void => {
  app.post(`${ API_PREFIX }/authenticate`, checkOneTimeToken, authenticate);
  app.use(isAuth);
  app.post(`${ API_PREFIX }/games/start`, startGame);
  app.get(`${ API_PREFIX }/games/end/:prediction`, endGame);
  app.use('*', (req, res) => res.sendStatus(NOT_FOUND));
}
