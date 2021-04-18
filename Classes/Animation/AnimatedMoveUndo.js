import AnimatedRefresh from './AnimatedRefresh';
import AnimatedTransfer from './AnimatedTransfer';
import Animation from './Animation';
import AnimationFrame from './AnimationFrame';
import CardAndPileIndex from '../DataModels/CardAndPileIndex';
import AnimatedFlip from './AnimatedFlip';

export default class AnimatedMoveUndo extends Animation {
    constructor(currentGame, fromPile, toPile, cards, flips, type) {
        let selection = new CardAndPileIndex(cards, fromPile, fromPile.cards.indexOf(cards[0]), false);
        super(currentGame, selection, toPile)
        this.flips = flips;
        this.built = false;
        this.type = type;
        this.build = this.build.bind(this);
    }

    build() {
        //Preprocess
        this.setPOSData();
        this.setFrameData();
        if(this.type == 'restock') this.selection.index = 0;
        this.frames.push(new AnimatedTransfer(this.currentGame, this.selection, this.target, this.type));
        if(this.flips.length > 0) {
            this.frames.push(new AnimatedFlip(this.flips));
        }

        //Process
        for(let i = 0; i < this.frameData.frames; i++) {
            this.frames.push(new AnimationFrame(this.selection.cards, this.frameData));
        }

        //Postprocess
        this.frames.push(new AnimatedRefresh(this.currentGame, this.selection, this.target));
    }

    execute() {
        if(this.built === false) {
            this.build();
            this.built = true;           
        } else {
            this.executionMethod();
        }
    }
}