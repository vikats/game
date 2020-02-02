"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const constants_1 = require("../constants");
class Cards {
    constructor() {
        this.deck = [];
    }
    generateDeck() {
        const deck = constants_1.suits
            .map(({ value }) => constants_1.cardValues
            .map(({ name, power }) => ({ name: name.concat(value), power })));
        this.deck = ramda_1.flatten(deck);
    }
    getDeck() {
        return this.deck;
    }
    getShuffledDeck() {
        const deck = this.deck.slice();
        return deck.sort(() => 0.5 - Math.random());
    }
    generateRandomCardFromDeck() {
        const deck = this.getShuffledDeck();
        const index = Math.floor(Math.random() * deck.length);
        return deck[index];
    }
}
const cards = new Cards();
exports.cards = cards;
//# sourceMappingURL=cards.js.map