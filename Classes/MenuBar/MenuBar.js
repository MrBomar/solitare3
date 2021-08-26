import Deck from '../Deck/Deck';
import DOMObject from '../DOMObject/DOMObject';
import MenuTag from '../MenuTag/MenuTag';
import MenuButton from '../MenuButton/MenuButton';
import { onResizeRotate } from '../../index';
import './MenuBar.css';

export default class MenuBar extends DOMObject {
    constructor(currentGame) {
        super('menuBar', 'div', document.body);
        this.currentGame = currentGame;
        this.buildMenu = this.buildMenu.bind(this);
        this.getButtonId = this.getButtonId.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onButtonOut = this.onButtonOut.bind(this);
        this.onButtonOver = this.onButtonOver.bind(this);
        this.onHomeClick = this.onHomeClick.bind(this);
        this.onRandomClick = this.onRandomClick.bind(this);
        this.onReplayClick = this.onReplayClick.bind(this);
        this.onSolvableClick = this.onSolvableClick.bind(this);
        this.onUndoClick = this.onUndoClick.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.buildMenu();
    }

    buildMenu() {
        //Add any bound methods before executing build();

        this.build();

        let actions = [
            { action: 'mouseover', method: this.onButtonOver},
            { action: 'mouseout', method: this.onButtonOut},
            { action: 'click', method: this.onButtonClick}
        ];

        //Build element children
        this.children.push(new MenuTag('home', this.object, actions, 'Home'));
        this.children.push(new MenuButton('home', this.object, actions, '⌂'));
        this.children.push(new MenuTag('undo', this.object, actions, 'Undo'));
        this.children.push(new MenuButton('undo', this.object, actions, "⮌"));
        this.children.push(new MenuTag('random', this.object, actions, 'Random'));
        this.children.push(new MenuButton('random', this.object, actions, '⤨'));
        this.children.push(new MenuTag('solvable', this.object, actions, 'Solvable'));
        this.children.push(new MenuButton('solvable', this.object, actions, "✔"));
        this.children.push(new MenuTag('replay', this.object, actions, 'Replay'));
        this.children.push(new MenuButton('replay', this.object, actions, "⥀"));
    }

    getButtonId(id_str) {
        let buttonId = id_str.substr(0, id_str.indexOf('Button'));
        if(buttonId == '') buttonId = id_str.substr(0, id_str.indexOf('Tag'));
        return buttonId;
    }

    onButtonClick(e) {
        switch(this.getButtonId(e.target.id)){
            case 'home':
                this.onHomeClick();
                break;
            case 'undo':
                this.onUndoClick(e);
                break;
            case 'random':
                this.onRandomClick();
                break;
            case 'solvable':
                this.onSolvableClick();
                break;
            case 'replay':
                this.onReplayClick();
                break;
            default:
                break;
        }
    }

    onButtonOut(e) {
        let buttonId = this.getButtonId(e.target.id);
        let me = this.children.find(i => i.id === (buttonId + "Tag"));
        if(!me.cssClasses.includes('hiddenTag') && !this.currentGame.menuBarOpen) {
            me.addCSSClass('hiddenTag');
        }
    }

    onButtonOver(e) {
        let buttonId = this.getButtonId(e.target.id);
        let me = this.children.find(i => i.id === (buttonId + "Tag"));
        if(me.cssClasses.includes('hiddenTag')) {
            me.removeCSSClass('hiddenTag');
        }
    }

    onHomeClick() {
        //Change this into an "about" modal.
        console.log('MenuBar.onHomeClick():');
    }

    onUndoClick(e) {
        if(this.currentGame.winDetected) return;
        //Check if undo array is empty
        if(this.currentGame.undoArray.length > 0 && !this.currentGame.winDetected) {
            this.currentGame.animations.push(this.currentGame.undoArray.pop());
        }
    }

    onRandomClick() {
        this.currentGame.clearModal();
        if(this.currentGame.autoSolveButton) this.currentGame.autoSolveButton.hide();
        let myDeck = new Deck(this.currentGame);
        this.toggleMenu(false);
        if (this.currentGame.allPiles.length === 0) this.currentGame.buildTable();
        this.currentGame.clearGame();
        this.currentGame.getPile('stock').cards = myDeck.getRandomDeck();
        this.currentGame.virginDeckString = myDeck.getDeckString();
        this.currentGame.getPile('stock').refresh();
        this.currentGame.dealFromStock();
        //Test.Piles._Print_All_Piles_Cards();
        onResizeRotate('deal');
        console.log(`Virgin deck string ${this.currentGame.virginDeckString}`);
    }

    onSolvableClick() {
        console.log('MenuBar.onSolvableClick():');
    }

    onReplayClick() {
        console.log('MenuBar.onReplayClick():');
    }

    toggleMenu(open) {
        this.currentGame.menuBarOpen = open;
        this.children.forEach(i => {
            if (i instanceof MenuTag) {
                if(open) {
                    i.removeCSSClass('hiddenTag');
                } else {
                    i.addCSSClass('hiddenTag');
                }
            }
        })
    }
}