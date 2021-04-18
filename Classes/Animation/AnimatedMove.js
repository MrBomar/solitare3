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
        this.flips = [];
        this.frames = [];
        this.type = null; //property set at build()
        this.build = this.build.bind(this);
        this.setFrameData = this.setFrameData.bind(this);
        this.setPOSData = this.setPOSData.bind(this);
        this.setType = this.setType.bind(this);
        this.build();
    }

    build() {
        //This method will build the frames and append them to the frames array

        //Preprocess
        this.setType();
        this.setPOSData();
        this.setFrameData();
        
        if(this.type === 'preflip' || this.type === 'restock') {
            this.frames.push(new AnimatedFlip(this.selection.cards));
            this.selection.cards.forEach(i => this.flips.push(i));
        } 
        
        this.transferCards();

        //Process
        for(let i = 0; i < this.frameData.frames; i++) {
            this.frames.push(new AnimationFrame(this.selection.cards, this.frameData));
        }

        //Postprocess
        this.frames.push(new AnimatedRefresh(this.currentGame, this.selection, this.target));
        if(this.type === 'postflip' && this.selection.pile.cards.length > 0) {
            let topCard = this.selection.pile.getTopCard();
            if(topCard.face === false) {
                this.frames.push(new AnimatedFlip([topCard]));
                this.flips.push(topCard);
            }
        }
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