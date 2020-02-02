"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cards = require('../mocks/cards.json');
function generateRandomCardFromDeck() {
    const deck = cards.sort(() => 0.5 - Math.random());
    const index = Math.floor(Math.random() * deck.length);
    return deck[index];
}
exports.generateRandomCardFromDeck = generateRandomCardFromDeck;
//# sourceMappingURL=cards.js.map