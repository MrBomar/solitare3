import Animation from './Animation';
import AnimationFrame from './AnimationFrame';
import AnimatedRefresh from './AnimatedRefresh';

export default class AnimatedMoveCancel extends Animation {
    constructor(currentGame, selection) {
        super(currentGame, selection, selection.pile);
        this.build();
    }

    build() {
        //Capture current card position and target position
        let myCard = this.selection.cards[0];
        this.posData = {startLeft: myCard.getLeft(), startTop: myCard.getTop(), endLeft: myCard.fixedPOS.left, endTop: myCard.fixedPOS.top};
        this.setFrameData();

        //Process
        for(let i = 0; i < this.frameData.frames; i++) {
            this.frames.push(new AnimationFrame(this.selection.cards, this.frameData));
        }

        //Post Process
        this.frames.push(new AnimatedRefresh(this.currentGame, this.selection, this.selection.pile));
    }
}