import DOMObject from '../DOMObject/DOMObject';

export default class Pile extends DOMObject {
    constructor(id_str, domType, eventListeners_arr_obj = false, cssClasses_arr_str = false, innerText = null) {
        super(id_str, domType, document.body, eventListeners_arr_obj, cssClasses_arr_str, innerText);
        this.cards = []; //Will store array of card objects
        this.addCard = this.addCard.bind(this);
        this.getCardObject = this.getCardObject.bind(this);
        this.getCards = this.getCards.bind(this);
        this.getFaceDownCards = this.getFaceDownCards.bind(this);
        this.getFaceUpCards = this.getFaceUpCards.bind(this);
        this.getTopCard = this.getTopCard.bind(this);
        this.nextCardPOS = this.nextCardPOS.bind(this);
        this.refresh = this.refresh.bind(this);
        this.selectCards = this.selectCards.bind(this);
    }

    addCard(card) {
        //Can be used to add a single card object, or an array of card objects.
        (typeof card === Array) ?
            this.cards.concat(card):
            this.cards.push(card);
    }

    getCardObject(DOMCardObj) {
        //Will take a DOM object and return a Card object if it exsists in the pile. - Temporary
        return (this.cards) ? this.cards.find(i => i.id == DOMCardObj.id) : false;
    }

    getCards(cards_arr) {
        //Used to cut cards from the pile and return them in an array. - Permenant
        let cardIndex = this.cards.findIndex(i => i === cards_arr[0]);
        return this.cards.splice(cardIndex, this.cards.length - cardIndex);
    }

    getFaceDownCards() {
        //Selects and returns an array of face down cards. - Temporary
        return (this.cards) ? this.cards.filter(i => !i.face) : false;
    }

    getFaceUpCards() {
        //Selects and returns an array of face up cards. - Temporary
        return (this.cards) ? this.cards.filter(i => i.face) : false;
    }

    getTopCard() {
        //Returns top card - Temporary
        return (this.cards) ? this.cards[this.cards.length-1] : false;
    }

    nextCardPOS() {
        return {left: this.getLeft(), top: this.getTop()};
    }

    refresh() {
        //Redraws the cars in the pile so they line up with the pile.
        this.cards.forEach(i => {
            i.setFixedPOS(this.getLeft(), this.getTop());
            i.setZIndex(this.cards.indexOf(i));
        })
    }

    selectCards(card_DOM_obj) {
        //Used to temporarily select cards from the pile
        let cardIndex = this.cards.findIndex(i => i.id === card_DOM_obj.id);
        return this.cards.slice(cardIndex, this.card.length);
    }
}