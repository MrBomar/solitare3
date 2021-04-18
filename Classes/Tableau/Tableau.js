import Conversion from '../../Methods/Conversions';
import Pile from '../Pile/Pile';
import './Tableau.css';

export default class Tableau extends Pile {
    constructor(id_str, eventListeners_arr_obj = false) {
        super('tableau' + id_str, 'div', eventListeners_arr_obj, ['tableau']);
        this.calculateMargin = this.calculateMargin.bind(this);
        this.initCards = Number(id_str);
        this.nextCardPOS = this.nextCardPOS.bind(this);
        this.refresh = this.refresh.bind(this);
        this.build();
    }

    calculateMargin(card) {
        return (card.face)? card.getHeight() / 4: card.getHeight() / 8;
    }

    pileComplete() {
        //let unFaceCards = this.cards.filter(i => i.face === false);
        return (this.cards.filter(i => i.face === false).length > 0)? false: true;
        //return (unFaceCards.length > 0)? false: true;
    }

    nextCardPOS() {
        if(this.cards.length == 0) {
            return {left: this.getLeft(), top: this.getTop()};
        } else {
            let topCard = this.getTopCard();
            let top = topCard.getTop() + this.calculateMargin(topCard);
            return {left: this.getLeft(), top: top}
        }
    }

    refresh() {
        if(this.cards.length){
            let marginTotal = 0;
            this.cards.forEach(card => {
                card.setFixedTop(this.object.offsetTop + marginTotal);
                marginTotal += this.calculateMargin(card);
                card.setFixedLeft(this.getLeft());
                card.setZIndex(this.cards.indexOf(card));
            })
        }
    }

    validateMove(selection) {
        if (!selection) {
            return false;
        } else if (!this.cards.length) {
            if(selection.cards[0].id.charAt(1) === 'M') return true;
        } else {
            let select = selection.cards[0];
            let target = this.getTopCard();
            if(select.getColor() != target.getColor() && (Conversion.FromAlpha(select.getValue()) == Conversion.FromAlpha(target.getValue()) - 1)) return true;
        }
        return false;
    }
}