const cards = require('../mocks/cards.json');

function generateRandomCardFromDeck() {
  const deck = cards.sort(() => 0.5 - Math.random());

  const index = Math.floor(Math.random() * deck.length);

  return deck[index];
}

export {
  generateRandomCardFromDeck,
}
