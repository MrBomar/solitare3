import DOMObject from "../DOMObject/DOMObject";

export default class AutoSolveButton extends DOMObject {
    constructor(currentGame, parent_dom) {
        super('autoSolveButton', 'div', parent_dom, false, ['hidden']);
        this.currentGame = currentGame;
        this.buildButton = this.buildButton.bind(this);
        this.hide = this.hide.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.unhide = this.unhide.bind(this);
        this.buildButton();
    };

    buildButton() {
        //Event listeners are inserted before the build.
        this.addEventListener({action: 'click', method: this.onMouseClick});
        this.addEventListener({action: 'mousedown', method: this.onMouseDown});
        this.addEventListener({action: 'mouseup', method: this.onMouseUp});
        this.build();
        
        //Children are added after the build
        this.children.push(new DOMObject('autoSolveText', 'h1', this.object, false, false, 'Auto Solve'));
        this.children[0].build();
    }

    hide() {
        if(!this.hasCSSClass('hidden')) this.addCSSClass('hidden');
    }

    onMouseClick(e) {
        //Execute the auto solve feature
        console.log('AutoSolveButton.onMouseClick()');
        this.currentGame.autoSolve();
    }

    onMouseDown(e) {
        //Add mouseDown class
        if(!this.hasCSSClass('mouseDown')) this.addCSSClass('mouseDown');
    }

    onMouseUp(e) {
        //Remove mouseDown Class
        if(this.hasCSSClass('mouseDown')) this.removeCSSClass('mouseDown');
    }

    unhide() {
        if(this.hasCSSClass('hidden')) this.removeCSSClass('hidden');
    }
}