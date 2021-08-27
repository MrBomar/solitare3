export default class AnimationFrame {
    constructor(cards, posData) {
        this.cards = cards;
        this.posData = posData;
        this.execute = this.execute.bind(this);
    }

    execute() {
        //FIX ME - Modify this frame to calculate movement
        //Subtract the final position from the current position and divide by frames remaining.
        //  fp - cp / fr
        //Perform this for both top and left positions.
        console.log('AnimationFrame.execute()');
        console.log('AnimationFrame.posData:');
        console.log(this.posData);
        this.cards.forEach(i => {
            if(i.getZIndex() < 100) i.setZIndex(100 + i.getZIndex());
            i.setTempLeft(i.getLeft() + this.posData.xPixels);
            i.setTempTop(i.getTop() + this.posData.yPixels);
        })
    }
}