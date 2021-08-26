import Card from '../Card/Card';
import Conversion, {CardValues} from  '../../Methods/Conversions';

export default class Deck {
    constructor(currentGame) {
        this.currentGame = currentGame;
        this.deck = null;
        this.getDeckString = this.getDeckString.bind(this);
        this.getRandomDeck = this.getRandomDeck.bind(this);
        this.getSolvableDeck = this.getSolvableDeck.bind(this);
        this.randomizeArray = this.randomizeArray.bind(this);
        this.reconstituteDeck = this.reconstituteDeck.bind(this);
    }

    getDeckString() {
        return this.deck.join('');
    }

    getRandomDeck() {
        //Generates an ordered deck
        let deckString = [];
        Conversion.SuiteValues().forEach(s => {
            CardValues.forEach(c => {
                deckString.push(`${s}${c}`);
            })
        });

        this.deck = this.randomizeArray(deckString);

        //Shuffle the new deck and builds the card objects
        return this.deck.map(i => new Card(this.currentGame, i, document.body, false));
    }

    getSolvableDeck() {
        //Grabs a previously solved deck from web server
    }

    randomizeArray(myArray) {
        let newArray = [];
        do {
            newArray.push(myArray.splice(Math.floor(Math.random() * myArray.length), 1)[0]);
        } while (myArray.length > 0)
        return newArray;
    }

    reconstituteDeck(str_deck) {
        //This method takes a string of characters and returns a deck of cards
    }

}