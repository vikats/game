import { Request, Response } from 'express';
import { BAD_REQUEST }from 'http-status-codes';

import app from '../app';
import { MESSAGES, GAME_STATUS } from '../constants';

import { processBalance } from '../modules';
import {
  generateRandomCardFromDeck,
  isSuccessPrediction
} from '../utils/cards';

const { FAILED, FINISHED } = GAME_STATUS;
const { YOU_LOST, YOU_WIN } = MESSAGES;

async function endGame(req: Request, res: Response) {
  const { models } = app.get('dbConnection');
  const { prediction } = req.params;
  const { playerId } = res.locals;

  if (!prediction) {
    return res.sendStatus(BAD_REQUEST);
  }

  const game = await models.playerGames.getInitiatedGame(playerId);
  if (!game) {
    return res.sendStatus(BAD_REQUEST);
  }
  const { id, betAmount, firstCard } = game;

  try {
    await processBalance('withdraw', betAmount, playerId);
    const { name: secondCard } = generateRandomCardFromDeck();
    const isWin = isSuccessPrediction(firstCard, secondCard, prediction);

    await models.playerGames.updateGameById(id, { secondCard, prediction, status: FINISHED });
    if (!isWin) {
      return res.send({ message: YOU_LOST });
    }
    await processBalance('deposit', betAmount * 2, playerId);

    return res.send({ message: YOU_WIN });
  } catch (e) {
    await models.playerGames.updateGameById(id, { status: FAILED });

    return res.sendStatus(BAD_REQUEST);
  }
}

export {
  endGame,
}
