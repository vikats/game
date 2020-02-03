import { Request, Response } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';

import { readToken } from '../utils/jwt';

export function isAuth(req: Request, res: Response, next: any) {
  const { authorizedToken } = req.cookies;

  try {
    const userData: any = readToken(authorizedToken);
    res.locals.playerId = userData.playerId;
  } catch (e) {
    return res.sendStatus(UNAUTHORIZED);
  }

  return next();
}
