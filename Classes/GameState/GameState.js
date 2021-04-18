import Foundation from '../Foundation/Foundation';
import MenuBar from '../MenuBar/MenuBar';
import Stock from '../Stock/Stock';
import Tableau from '../Tableau/Tableau';
import Talon from '../Talon/Talon';
import AnimatedMove from '../Animation/AnimatedMove';
import AnimatedMoveUndo from '../Animation/AnimatedMoveUndo';
import AnimatedMoveCancel from '../Animation/AnimatedMoveCancel';
import CardAndPileIndex from '../DataModels/CardAndPileIndex';
import AutoSolveDiv from '../AutoSolveButton/AutoSolveDiv';

export default class GameState {
    constructor() {
        this.allPiles = [];
        this.animations = []; //An array of objects and their new POS per frame.
        this.animationFrameRate = 60; //Number of frames to animate per second.
        this.animationLength = .50; //Longest animation length.
        this.animationTimer = null; //Need to write timer here.
        this.autoSolveButton = null;
        this.dealOrder = false;
        this.dealTimer = false;
        this.doubleClickTimer = false; //Null == expired
        this.menuBar = null;
        this.selection = null;
        this.selectionTimer = null; //The timer will be added and removed based on game action.
        this.target = null;
        this.undoArray = []; //For use with the undo method
        this.virginStock = false; //Here we store the virginStock deck - not to be modified.
        this.winDetected = false;
        this.autoSolve = this.autoSolve.bind(this);
        this.cancelMove = this.cancelMove.bind(this);
        this.clearDoubleClickTimer = this.clearDoubleClickTimer.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
        this.clearTarget = this.clearTarget.bind(this);
        this.completeMove = this.completeMove.bind(this);
        this.dealFromStock = this.dealFromStock.bind(this);
        this.dealTimerAction = this.dealTimerAction.bind(this);
        this.detectWin = this.detectWin.bind(this);
        this.getCardPileAndIndex = this.getCardPileAndIndex.bind(this);
        this.getPile = this.getPile.bind(this);
        this.getTableau = this.getTableau.bind(this);
        this.loadGame = this.loadGame.bind(this);
        this.onStockClick = this.onStockClick.bind(this);
        this.setDoubleClickTimer = this.setDoubleClickTimer.bind(this);
        this.setTarget = this.setTarget.bind(this);
        this.startAnimationTimer = this.startAnimationTimer.bind(this);
        this.loadGame();
    }

    autoSolve() {
        //AutoSolve Method
    }

    cancelMove() {
        //The cancel move action
        if(this.selection) {
            this.animations.push(new AnimatedMoveCancel(this, this.selection));
            this.clearTarget();
            this.clearSelection();
        }
    }

    clearDoubleClickTimer() {
        clearTimeout(this.doubleClickTimer);
        this.doubleClickTimer = false;
        if(this.selection != null) this.selection.pile.refresh();
        if(this.target != null) this.target.refresh();
        this.clearSelection();
        this.clearTarget();
    }

    clearGame() {
        this.allPiles.forEach(i => {
            i.cards.forEach(j => j.destroy());
            i.cards = [];
        })
        this.animations = [];
        this.animationTimer = null;
        this.dealOrder = false;
        this.dealTimer = false;
        this.doubleClickTimer = false;
        this.clearSelection();
        this.selectionTimer = null;
        this.clearTarget();
        this.undoArray = [];
        this.virginStock = false;
    }

    clearSelection() {
        this.selection = null;
    }

    clearTarget() {
        this.target = null;
    }

    completeMove(type = false) {
        let animation = new AnimatedMove(this, this.selection, this.target);

        //Build undo action
        if(type != 'deal') {
            let cards = [...this.selection.cards];
            let flips = [...animation.flips];
            let fromPile = this.target;
            let toPile = this.selection.pile;
            this.undoArray.push(new AnimatedMoveUndo(this, fromPile, toPile, cards, flips, type));
        }

        this.animations.push(animation);
        this.clearSelection();
        this.clearTarget();
    }

    dealFromStock() {
        //Deal order
        this.dealOrder = [
            'tableau1','tableau2','tableau3','tableau4','tableau5','tableau6','tableau7',
            'tableau2','tableau3','tableau4','tableau5','tableau6','tableau7',
            'tableau3','tableau4','tableau5','tableau6','tableau7',
            'tableau4','tableau5','tableau6','tableau7',
            'tableau5','tableau6','tableau7',
            'tableau6','tableau7',
            'tableau7'
        ];

        this.dealTimer = setInterval(() => {            
            if(this.dealOrder.length > 0) {
                this.target = this.getPile(this.dealOrder.shift());
                this.setSelection(this.getCardPileAndIndex(this.getPile('stock').getTopCard().id, {top:0, left: 0}));
                this.completeMove('deal');
            } else {
                clearInterval(this.dealTimer);
                this.dealTimer = false;
            }
        }, 190)
    }

    dealTimerAction() {
        this.setSelection(this.getCardPileAndIndex(this.getPile('stock').getTopCard().id));
        this.target = this.getPile(this.dealOrder.shift());
        this.onCardMouseUp(false, 'deal');

        if(this.dealOrder.length > 0) {
            this.dealTimer = setTimeout(() => {
                this.dealTimerAction();
            }, 200);
        } else {
            let lastFrame = this.animations[this.animations.length -1];
            this.getTableau().forEach(i=>{
                lastFrame.push(new FlipTopCard(i));
            })
        }
    }

    detectWin() {
        let completedTableau = this.getTableau().filter(i => {
            let completion = i.pileComplete();
            console.log(completion);
            if(completion == true){
                return true;
            } else {
                return false;
            }
        });
        console.log(completedTableau);
        if(completedTableau.length == 7) {
            this.winDetected = true;
            this.autoSolveButton.unhide();
        }
    }

    getCardPileAndIndex(cardId_str, mousePOS = false) {
        let cardPileIndex = false;
        this.allPiles.forEach(i => {
            for(let j = 0; j < i.cards.length; j++) {
                if(i.cards[j].id == cardId_str) {
                    cardPileIndex = new CardAndPileIndex(i.cards.slice(j, i.cards.length), i, j, mousePOS);
                }
            }
        })
        return cardPileIndex;
    }

    getPile(pileName_str) { return (this.allPiles)? this.allPiles.find(i=> i.id == pileName_str): false;}

    getTableau() {return (this.allPiles)? this.allPiles.filter(i => i instanceof Tableau): false;}

    getValidTarget() {
        //Something is breaking here
        let filteredPiles = this.allPiles.filter(i => {
            if((i.id !== this.selection.pile.id) && (i.id != 'stock') && (i.id != 'talon')) return true;
        });
        let validTarget = filteredPiles.filter(i => i instanceof Foundation).find(i => i.validateMove(this.selection));
        return (validTarget === undefined)? filteredPiles.filter(i => i instanceof Tableau).find(i => i.validateMove(this.selection)): validTarget;
    }

    loadGame() {
        ['1','2','3','4','5','6','7'].forEach(i => {this.allPiles.push(new Tableau(i))});
        this.allPiles.push(new Stock(this));
        this.allPiles.push(new Talon(this));
        ['S', 'H', 'D', 'C'].forEach(i => { this.allPiles.push(new Foundation(i))});
        this.menuBar = new MenuBar(this);
        this.autoSolveButton = new AutoSolveDiv(this, document.body);
        this.startAnimationTimer();
    }

    onCardMouseDown(cardId_str, mousePOS) {
        //Capture the Pile object, array of Card objects, Card index, and mouse position.
        this.setSelection(this.getCardPileAndIndex(cardId_str, mousePOS));
    }

    onCardMouseUp(e) {
        //Step - 1: Verify that a selection has been made
        if(this.selection) {

            if(this.selection.pile instanceof Stock) {
                this.target = this.getPile('talon');
                this.completeMove();
            } else {

                //Step - 2: Set and Check for valid target
                this.target = (this.target)? this.target: this.setTarget(e.clientX, e.clientY);

                //Verify we have a target
                if(this.target){
                    
                    //Double click detection
                    if(this.selection.pile === this.target) {
                        if(this.doubleClickTimer) {
                            
                            //Double click initiated
                            this.target = this.getValidTarget();
                            if(this.target === undefined){
                                this.cancelMove();
                            } else if(this.selection.cards[0].face){
                                this.completeMove();
                            }

                        } else {
                            this.setDoubleClickTimer();
                        }
                    } else {

                        //Complete drag move
                        if(this.target.validateMove(this.selection)) {
                            this.completeMove();
                        }  else {this.cancelMove()}
                    }
                } else {this.cancelMove();}                                 
            }
        } else {this.cancelMove()}
    }

    onMouseMove(e) {
        //Only proceed if cards have been selected
        if(this.selection) {
            if(this.selection.cards[0].face === false || this.target) return;
            //Calculate the amount the mouse has moved since the first mousedown.
            let movement = {left: e.clientX - this.selection.clickPOS.left, top: e.clientY - this.selection.clickPOS.top};
            //Adjust the temporary position of each card in the selection
            let cardsArrayLength = this.selection.cards.length;
            for(let i = 0; i < cardsArrayLength; i++){
                let currentCard = this.selection.cards[i];
                let tempTop = currentCard.fixedPOS.top + movement.top;
                let tempLeft = currentCard.fixedPOS.left + movement.left;
                if(currentCard.getZIndex() < 100) currentCard.setZIndex(100 + i);
                currentCard.setTempPOS(tempLeft, tempTop);
            }
        }
    }

    onStockClick(e) {
        let stock = this.getPile('stock');
        let talon = this.getPile('talon');
        if(stock.cards.length == 0 && talon.cards.length > 0) {
            let selectionCards = [...talon.cards];
            this.setSelection({pile: talon, cards: selectionCards, index: 0, clickPOS: {left: e.clientX, top:e.clientY}});
            this.target = stock;
            this.completeMove('restock');
        }
    }

    setDoubleClickTimer() {
        this.doubleClickTimer = setTimeout(this.clearDoubleClickTimer, 300);
    }

    setSelection(data) {
        this.selection = data;
    }

    setTarget(mouseX, mouseY) {
        //Use the mouse position to locate the target
        return this.allPiles.find(i => {
            let coords = i.getDimensions();
            if(mouseX > coords.left && mouseX < coords.right && mouseY > coords.top && mouseY < coords.bottom){
                return true;
            }
        })
    }

    startAnimationTimer() {
        this.animationTimer = setInterval(()=>{
            if(this.animations.length > 0) {
                this.animations.forEach(i => {
                    i.execute();
                })
            }
        }, 500 / this.animationFrameRate);
    }
}