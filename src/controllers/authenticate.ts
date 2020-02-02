import { Request, Response } from 'express';

import app from '../app';

import { verifyOneTimeToken } from '../modules/microservice-link';
import { writeToken } from '../utils/jwt';
import { BAD_REQUEST_CODE, PLAYER_ALREADY_INITIATED_GAME } from '../constants/api';

function authenticate(req: Request, res: Response) {
  const { models } = app.get('dbConnection');

  const { oneTimeToken } = req.body;
  if (!oneTimeToken) {
    return res.sendStatus(BAD_REQUEST_CODE);
  }

  verifyOneTimeToken(oneTimeToken)
    .then(async ({ body }: any) => {
      const { playerId } = body;

      const game = await models.playerGames.getInitiatedGames(playerId);
      if (game) {
        return res.status(BAD_REQUEST_CODE)
          .send({ message: PLAYER_ALREADY_INITIATED_GAME, ...body, ...game });
      }
      res.cookie('authorizedToken', writeToken(body));

      return res.send(body);
    })
    .catch(() => res.sendStatus(BAD_REQUEST_CODE));
}

export {
  authenticate,
}
