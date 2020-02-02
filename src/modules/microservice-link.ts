import request from 'request';
import crypto from 'crypto';
import { STATUS_OK_CODE } from '../constants/api';

const cryptoValue =  {
  alg: 'aes-256-cbc',
  key: 'uxrywmqxyigfcjndtgmbbsnzlkegjuso', // 32 length
  salt: 'kzqwootmgxudutze' // 16 length
};

const microserviceName = 'game-service';

function createAuthToken() {
  const { alg, key, salt } = cryptoValue;
  const cipher = crypto.createCipheriv(alg, Buffer.from(key), Buffer.from(salt));

  const text = JSON.stringify({
    createdAt: Date.now(),
    microserviceName,
  });

  return cipher.update(text, 'utf8', 'hex').concat(cipher.final('hex'));
}

function verifyOneTimeToken(oneTimeToken: string) {
  const target = 'tokens/verify';

  const options = {
    headers: {
      microserviceHash: createAuthToken(),
    },
    body: {
      oneTimeToken,
    },
    json: true,
    url: `http://127.0.0.1:3001/${ target }`,
  };

  return new Promise((resolve, reject) => {
    request.post(options, (err, res) => {
      if (err) {
        return reject(err);
      }

      if (res && res.statusCode !== STATUS_OK_CODE) {
        return reject(res);
      }

      return resolve(res)
    })
  });
}

function processBalance(processType: string, betAmount: number, playerId: number) {
  const target = `wallets/${ processType }`;

  const options = {
    headers: {
      microserviceHash: createAuthToken(),
    },
    body: {
      betAmount,
      playerId,
    },
    json: true,
    url: `http://127.0.0.1:3001/${ target }`,
  };

  return new Promise((resolve, reject) => {
    request.post(options, (err, res) => {
      if (err) {
        return reject(err);
      }

      if (res && res.statusCode !== STATUS_OK_CODE) {
        return reject(res);
      }

      return resolve(res)
    })
  });
}

export {
  verifyOneTimeToken,
  processBalance,
}
