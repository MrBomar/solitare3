export default class AnimationFrame {
    constructor(cards, posData) {
        this.cards = cards;
        this.posData = posData;
        this.execute = this.execute.bind(this);
    }

    execute() {
        this.cards.forEach(i => {
            if(i.getZIndex() < 100) i.setZIndex(100 + i.getZIndex());
            i.setTempLeft(i.getLeft() + this.posData.xPixels);
            i.setTempTop(i.getTop() + this.posData.yPixels);
        })
    }
}