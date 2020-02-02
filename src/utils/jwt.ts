import jwt, { SignOptions } from 'jsonwebtoken';

const signOptions: SignOptions = {
  algorithm: 'HS256',
  issuer: 'card-predictor',
  expiresIn: 60000000,
};
const key = 'dtglebplfpvqzfpwgpgywckwvuwylg';

type jwtClientTokenType = {
  playerId: string
}

function writeToken(userData: jwtClientTokenType) {
  return jwt.sign(userData, key, signOptions);
}

function readToken(token: string) {
  return jwt.verify(token, key);
}

export {
  writeToken,
  readToken,
  jwtClientTokenType
}
