import { Request, Response } from 'express';
import { BAD_REQUEST }from 'http-status-codes';

import app from '../app';

import { generateRandomCardFromDeck } from '../utils/cards';
import { ERRORS } from '../constants';

const { PLAYER_ALREADY_INITIATED_GAME } = ERRORS;

async function startGame(req: Request, res: Response) {
  const { models } = app.get('dbConnection');
  const { playerId } = res.locals;
  const { betAmount } = req.body;

  const game = await models.playerGames.getInitiatedGame(playerId);
  if (game) {
    return res.status(BAD_REQUEST)
      .send({ message: PLAYER_ALREADY_INITIATED_GAME, ...game });
  }

  const { name: firstCard } = generateRandomCardFromDeck();

  await models.playerGames.create({ firstCard, betAmount, playerId });

  return res.send({ card: firstCard });
}

export {
  startGame,
}
