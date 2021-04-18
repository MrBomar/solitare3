import Pile from '../Pile/Pile';
import Conversion from '../../Methods/Conversions';
import './Foundation.css';

export default class Foundation extends Pile {
    constructor(suite, eventListeners_arr_obj = false) {
        super(suite + 'Foundation', 'h1', eventListeners_arr_obj, ['foundation'], Conversion.ToSymbol(suite));
        this.suite = suite;
        this.validateMove = this.validateMove.bind(this);
        this.build();
    }

    validateMove(selection) {
        //Takes an array of card objects and verifies the move is valid.
        if(selection.cards.length == 1) {
            if(selection.cards[0].getSuite() == this.suite) {
                if(this.cards.length == 0) {
                    if(selection.cards[0].getValue() == 'A') return true;
                } else {
                    if(Conversion.FromAlpha(selection.cards[0].getValue()) == Conversion.FromAlpha(this.getTopCard().getValue()) + 1 ) return true;
                }
            }
        }
        return false;
    }
}