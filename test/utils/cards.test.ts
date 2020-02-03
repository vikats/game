import { equal } from 'assert';

import { isSuccessPrediction } from '../../src/utils/cards';

describe('utils isSuccessPrediction', () => {
  it('should return positive result for prediction', () => {
    const firstCard = '4s';
    const secondCard = '2s';
    const prediction = 'high';
    const result = true;

    const expected = isSuccessPrediction(firstCard, secondCard, prediction);

    equal(result, expected);
  });
  it('should return negative result for prediction', () => {
    const firstCard = '4s';
    const secondCard = '6s';
    const prediction = 'high';
    const result = false;

    const expected = isSuccessPrediction(firstCard, secondCard, prediction);

    equal(result, expected);
  });
  it('should return negative result if first card is an empty string', () => {
    const firstCard = '';
    const secondCard = '6s';
    const prediction = 'high';
    const result = false;

    const expected = isSuccessPrediction(firstCard, secondCard, prediction);

    equal(result, expected);
  });
});

