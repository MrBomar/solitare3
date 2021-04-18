import Pile from '../Pile/Pile';
import './Stock.css';

export default class Stock extends Pile {
    constructor(currentGame, eventListeners_arr_obj = false) {
        super('stock', 'div', eventListeners_arr_obj, ['stock']);
        this.currentGame = currentGame;
        this.onMouseClick = this.onMouseClick.bind(this);
        this.addEventListener({action: 'click', method: this.onMouseClick});
        this.refresh = this.refresh.bind(this);
        this.build();
    }

    onMouseClick(e) {
        this.currentGame.onStockClick(e);
    }

    refresh() {
        this.cards.forEach(i => {
            i.setFixedPOS(this.getLeft(), this.getTop());
            i.setZIndex(this.cards.indexOf(i));
            i.flip(false);
        })
    }

    validateMove() {
        //This method is used to validate card movement.
    }
}