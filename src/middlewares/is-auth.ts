import { Request, Response } from 'express';
import { readToken, jwtClientTokenType } from '../utils/jwt';
import { NOT_AUTHORIZED_CODE } from '../constants/api';

function isAuth(req: Request, res: Response, next: any) {
  const { authorizedToken } = req.cookies;

  try {
    const userData = readToken(authorizedToken) as jwtClientTokenType;
    res.locals.playerId = userData.playerId;
  } catch (e) {
    return res.sendStatus(NOT_AUTHORIZED_CODE);
  }

  return next();
}

export {
  isAuth,
}
