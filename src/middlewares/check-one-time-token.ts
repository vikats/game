import { Request, Response } from 'express';

import { verifyOneTimeToken } from '../modules';

import { ERRORS } from '../constants';
const { TOKEN_NOT_FOUNT } = ERRORS;

export async function checkOneTimeToken(req: Request, res: Response, next: any) {
  const { oneTimeToken } = req.body;
   try {
     if (!oneTimeToken) {
       throw new Error(TOKEN_NOT_FOUNT);
     }

     req.body = await verifyOneTimeToken(oneTimeToken);
   } catch (e) {
     return next(e);
   }

   return next();
}
