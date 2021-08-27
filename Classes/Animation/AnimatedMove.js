import Animation from './Animation';
import AnimatedFlip from './AnimatedFlip';
import AnimationFrame from './AnimationFrame';
import AnimatedRefresh from './AnimatedRefresh';
import Stock from '../Stock/Stock';
import Talon from '../Talon/Talon';
import Foundation from '../Foundation/Foundation';
import Tableau from '../Tableau/Tableau';
import AnimatedDetectWin from './AnimatedDetectWin';

export default class AnimatedMove extends Animation {
    constructor(currentGame, selection, target) {
        super(currentGame, selection, target);
        this.flips = []; //This array will store any flips made, used in the Undo process.
        this.type = null; //property set at build(), determines the type of move being played.
        this.build = this.build.bind(this);
        this.setFrameData = this.setFrameData.bind(this);
        this.setPOSData = this.setPOSData.bind(this);
        this.setType = this.setType.bind(this);
        this.build();
    }

    build() {
        //This method will build the frames and append them to the frames array

        //Preprocess
        this.setType(); //Determines what type of move is being made.
        this.setPOSData(); //Captures the initial and final position of the selection.
        this.setFrameData(); //Calculates the number of frames needed to complete the animation.
        
        //If the move requires the card to be flips before moving then it will flip the card.
        if(this.type === 'preflip' || this.type === 'restock') {
            this.frames.push(new AnimatedFlip(this.selection.cards));
            this.selection.cards.forEach(i => this.flips.push(i));
        } 
        
        //Cuts the card objects from the originating pile and pastes them into the target pile.
        this.transferCards();

        //Process
        //FIX ME - Pass into AnimationFrame the selection cards and the number of frames remaining.
        //FIX ME - The number of frames remaining should decrease with each AnimationFrame created.
        for(let i = 0; i < this.frameData.frames; i++) {
            this.frames.push(new AnimationFrame(this.selection.cards, this.frameData));
        }

        //Postprocess
        //This line will go through the selection and target and make sure all the cards are lined up.
        this.frames.push(new AnimatedRefresh(this.currentGame, this.selection, this.target));

        //If the tye of move requires a flip post move then it will flip the cards post move.
        if(this.type === 'postflip' && this.selection.pile.cards.length > 0) {
            let topCard = this.selection.pile.getTopCard();
            if(topCard.face === false) {
                this.frames.push(new AnimatedFlip([topCard]));
                this.flips.push(topCard);
            }
        }

        //At the end of dealing the cards this will go through the Tableau and flip the top cards.
        if(this.type === 'deal' && this.target.cards.length == this.target.initCards) {
            this.frames.push(new AnimatedFlip(this.selection.cards));
            this.selection.cards.forEach(i => this.flips.push(i));
        }

        //Add win detection
        if (this.type != 'deal') this.frames.push(new AnimatedDetectWin(this.currentGame));
    }

    setType() {
        //Identify move type
            //Stock to Talon - Preflip
            //Stock to Tableau - Deal Sequence
            //Talon to Foundation - Noflip
            //Talon to Tableau - Noflip
            //Talon to Stock - Restock
            //Tableau to Tableau - Postflip
            //Tableau to Foundation - Postflip
            //Foundation to Tableau - Noflip
        if(this.selection.pile instanceof Stock) {
            if(this.target instanceof Talon) this.type = 'preflip';
            if(this.target instanceof Tableau) this.type = 'deal';
        } else if(this.selection.pile instanceof Talon) {
            if(this.target instanceof Foundation) this.type = 'noflip';
            if(this.target instanceof Tableau) this.type = 'noflip';
            if(this.target instanceof Stock) this.type = 'restock';
        } else if(this.selection.pile instanceof Tableau) this.type = 'postflip';
        else if(this.selection.pile instanceof Foundation) this.type = 'noflip';
    }
}