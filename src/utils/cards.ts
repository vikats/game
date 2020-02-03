import cards from '../mocks/cards.json';

import { GAME_PREDICTION } from '../constants';
const { HIGH } = GAME_PREDICTION;

function generateRandomCardFromDeck() {
  const deck = cards.sort(() => 0.5 - Math.random());

  const index = Math.floor(Math.random() * deck.length);

  return deck[index];
}

function isSuccessPrediction(firstCard: string, secondCard: string, prediction: string): boolean {
  const { power: firstCardPower } = cards.find(({ name }: any) => name === firstCard) || {};
  const { power: secondCardPower } = cards.find(({ name }: any) => name === secondCard) || {};

  if (!firstCardPower || !secondCardPower) {
    return false;
  }

  return prediction === HIGH
    ? firstCardPower >= secondCardPower
    : firstCardPower <= secondCardPower;
}

export {
  generateRandomCardFromDeck,
  isSuccessPrediction,
}
