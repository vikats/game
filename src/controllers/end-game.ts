import { Request, Response } from 'express';

import app from '../app';

import { processBalance } from '../modules/microservice-link';
import {
  BAD_REQUEST_CODE,
} from '../constants/api';

async function endGame(req: Request, res: Response) {
  const { models } = app.get('dbConnection');
  const { prediction } = req.params;
  const { playerId } = res.locals;

  if (!prediction) {
    return res.sendStatus(BAD_REQUEST_CODE);
  }

  const game = await models.playerGames.getInitiatedGames(playerId);
  if (!game) {
    return res.status(BAD_REQUEST_CODE);
  }
  const { betAmount } = game;

  processBalance('withdraw', betAmount, playerId)
    .then()
    .catch(() => res.sendStatus(BAD_REQUEST_CODE)); // need to add void game
}

export {
  endGame,
}
