import './AutoSolveDiv.css';
import DOMObject from '../DOMObject/DOMObject';
import AutoSolveButton from './AutoSolveButton';

export default class AutoSolveDiv extends DOMObject {
    constructor(currentGame, parent_dom) {
        super('autoSolve', 'div', parent_dom, false, false);
        this.currentGame = currentGame;
        this.buildDiv = this.buildDiv.bind(this);
        this.hide = this.hide.bind(this);
        this.unhide = this.unhide.bind(this);
        this.buildDiv();
    }

    buildDiv() {
        this.build();

        //Add children elements
        this.children.push(new AutoSolveButton(this.currentGame, this.object));
    }

    hide() {
        this.children[0].hide();
    }

    unhide() {
        this.children[0].unhide();
    }
}