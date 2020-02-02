import { Request, Response } from 'express';

import app from '../app';

import { generateRandomCardFromDeck } from '../utils/cards';
import {
  BAD_REQUEST_CODE,
  PLAYER_ALREADY_INITIATED_GAME
} from '../constants/api';

async function startGame(req: Request, res: Response) {
  const { models } = app.get('dbConnection');
  const { playerId } = res.locals;
  const { betAmount } = req.body;

  const game = await models.playerGames.getInitiatedGames(playerId);
  if (game) {
    return res.status(BAD_REQUEST_CODE)
      .send({ message: PLAYER_ALREADY_INITIATED_GAME, ...game });
  }

  const { name: firstCard } = generateRandomCardFromDeck();

  await models.playerGames.create({
    firstCard,
    betAmount,
    playerId
  });

  return res.send({ card: firstCard });
}

export {
  startGame,
}
