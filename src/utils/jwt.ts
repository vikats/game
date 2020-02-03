import jwt from 'jsonwebtoken';
import config from 'config';

function writeToken(playerId: number) {
  const { signOptions, key } = config.get('jwt');
  return jwt.sign({ playerId }, key, signOptions);
}

function readToken(token: string) {
  const { key } = config.get('jwt');

  return jwt.verify(token, key);
}

export {
  writeToken,
  readToken,
}
