import request from 'request';
import { MULTIPLE_CHOICES } from 'http-status-codes';

import { createHash } from '../utils/hash-string';
import {
  MICROSERVICE_NAME,
  WALLET_LINK,
} from '../constants';

function verifyOneTimeToken(oneTimeToken: string) {
  const target = 'tokens/verify';

  return sendToMicroservice({ oneTimeToken }, target);
}

function processBalance(processType: string, betAmount: number, playerId: number) {
  const target = `wallets/${ processType }`;

  return sendToMicroservice({ betAmount, playerId }, target);
}

function sendToMicroservice(body: object, target: string) {
  const options = {
    headers: {
      'microservice-hash': createHash({ microserviceName: MICROSERVICE_NAME, body }),
    },
    body,
    json: true,
    url: `${ WALLET_LINK }${ target }`,
  };
  console.log(options);
  return new Promise((resolve, reject) => {
    request.post(options, (err, res, body) => {
      if (err) {
        return reject(err);
      }

      if (res && res.statusCode > MULTIPLE_CHOICES) {
        return reject(res);
      }

      return resolve(body)
    })
  });
}

export {
  verifyOneTimeToken,
  processBalance,
}
