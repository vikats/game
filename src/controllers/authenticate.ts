import { Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status-codes';

import app from '../app';
import { writeToken } from '../utils/jwt';

async function authenticate(req: Request, res: Response) {
  const { playerId } = req.body;

  try {
    res.cookie('authorizedToken', writeToken(playerId));

    return res.send(await prepareUserUnfinishedGame(playerId));
  } catch (e) {
    return res.sendStatus(BAD_REQUEST);
  }
}

async function prepareUserUnfinishedGame(playerId: number) {
  const { models } = app.get('dbConnection');

  const game = await models.playerGames.getInitiatedGame(playerId) || {};

  return { game, playerId }
}

export {
  authenticate,
}
