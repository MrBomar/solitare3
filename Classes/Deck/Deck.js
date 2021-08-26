import Card from '../Card/Card';
import Conversion, {CardValues} from  '../../Methods/Conversions';

export default class Deck {
    constructor(currentGame, type) {
        this.currentGame = currentGame;
        this.deck = null;
        this.type = type; //Stores the type of deck specified
        this.buildDeck = this.buildDeck.bind(this);
        this.buildRandomDeck = this.buildRandomDeck.bind(this);
        this.convertArrayToDeck = this.convertArrayToDeck.bind(this);
        this.convertDeckToArray = this.convertDeckToArray.bind(this);
        this.convertDeckToString = this.convertDeckToString.bind(this);
        this.convertStringToArray = this.convertStringToArray.bind(this);
        this.getSolvableDeck = this.getSolvableDeck.bind(this);
        this.randomizeArray = this.randomizeArray.bind(this);
        this.buildDeck('Init');
    }

    buildDeck(stuff) {
        if(this.deck === null) {
            switch (this.type) {
                case 'random':
                    this.buildRandomDeck();
                    break;
                case 'solvable':
                    this.getSolvableDeck();
                    break;
                default:
                    console.log(`Deck.buildDeck(${stuff}) : You need to specify a deck type`);
                    break;
            }
        } else {
            console.log(`Deck.buildDeck(${stuff}) : A deck already exsists, cannot perform this function.`)
        }
    }

    buildRandomDeck() {
        //Generates an ordered deck array of strings
        let deckString = [];
        Conversion.SuiteValues().forEach(s => {
            CardValues.forEach(c => {
                deckString.push(`${s}${c}`);
            })
        });

        //Randomizes the array and converts it to a functioning deck.
        this.deck = this.convertArrayToDeck(this.randomizeArray(deckString));
    }

    convertArrayToDeck(arr) {
        return arr.map(i => new Card(this.currentGame, i, document.body, false))
    }
    convertDeckToArray() {
        return this.deck.map(i => i.id);
    }

    convertDeckToString() {
        return this.convertDeckToArray().join('');
    }

    convertStringToArray(str) {
        //Verify the string is proper length
        if(str.length === 104) {
            let charArry = String(str).split('');
            let strArray = [];
            do {
                strArray.push(`${charArry.shift()}${charArry.shift()}`);
            } while (charArry.length > 0);
            return strArray;
        }

        console.log(`String '${str}' is not a valid deck string.`);
        return false;
    }

    getSolvableDeck() {
        //Grabs a previously solved deck from web server
        let solvableDeck = 'CIDKHISHSEDBCHHACJCBHFSBDIHKDADCDFHCSLCDSGDGCGHJHHHGSFSISACFCLDLHDHLCKSJDEHECECCHBSMSDCMDHSKHMCASCDJDDDM';

        //Convert string to playable deck
        this.deck = this.convertArrayToDeck(this.convertStringToArray(solvableDeck));
    }

    randomizeArray(myArray) {
        let newArray = [];
        do {
            newArray.push(myArray.splice(Math.floor(Math.random() * myArray.length), 1)[0]);
        } while (myArray.length > 0)
        return newArray;
    }
}