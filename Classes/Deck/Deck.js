import Card from '../Card/Card';
import Conversion, {CardValues} from  '../../Methods/Conversions';

export default class Deck {
    constructor(currentGame, type, pappy) {
        this.currentGame = currentGame;
        this.deck = null;
        this.type = type; //Stores the type of deck specified
        this.pappy = pappy;
        this.buildDeck = this.buildDeck.bind(this);
        this.buildRandomDeck = this.buildRandomDeck.bind(this);
        this.convertArrayToDeck = this.convertArrayToDeck.bind(this);
        this.convertDeckToArray = this.convertDeckToArray.bind(this);
        this.convertDeckToString = this.convertDeckToString.bind(this);
        this.convertStringToArray = this.convertStringToArray.bind(this);
        this.deckStringConversion = this.deckStringConversion.bind(this);
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

    deckStringConversion(str) {
        //Convert string to array of strings
        let arr = this.convertStringToArray(str);
        console.log(`Deck.checkStringVersion():`);
        console.log(arr);

        switch (arr[0][0]) {
            case "c" : case "s" : case "h" : case "d":
                console.log("Old Version");
                //Cycle through each string and convert to new version
                return arr.map(i => Conversion.OldToNew(i));
            default:
                return arr;
        }
    }

    getSolvableDeck() {
        //FIX ME - Experimental
        new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest;
            xhr.open('GET', "https://mrlesbomar.com/games/cgi-bin/get_solved_deck.php");
            xhr.onload = () =>{
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
            }
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        }).then(stuff=> {
            //FIX ME - Need to detect if this is the old format or new format.
            //FIX ME - Need to convert old string to new string.

            this.deck = this.convertArrayToDeck(this.deckStringConversion(stuff));
            this.pappy.setBoard();
        }).catch(error=>{
            //Create status screen and deal random deck
            let notice = document.createElement('div');
            notice.id = 'notice';
            notice.innerHTML = `<h1>Unable to connect to the server. Please choose a random deck.</h1>`;
            document.getElementsByTagName('main')[0].appendChild(notice);
        });
    }

    randomizeArray(myArray) {
        let newArray = [];
        do {
            newArray.push(myArray.splice(Math.floor(Math.random() * myArray.length), 1)[0]);
        } while (myArray.length > 0)
        return newArray;
    }
}