import Pile from '../Pile/Pile';
import './Talon.css';

export default class Talon extends Pile {
    constructor(currentGame, eventListeners_arr_obj = false) {
        super('talon', 'div', eventListeners_arr_obj, ['talon']);
        this.currentGame = currentGame;
        this.refresh = this.refresh.bind(this);
        this.validateMove = this.validateMove.bind(this);
        this.build();
    }

    refresh() {
        this.cards.forEach(i => {
            i.setFixedPOS(this.getLeft(), this.getTop());
            i.setZIndex(this.cards.indexOf(i));
            i.flip(true);
        })
    }

    validateMove() {
        return (this.currentGame.selection.pile.id == 'stock')? true: false;
    }
}