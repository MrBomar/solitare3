export default class AnimatedFlip {
    constructor(cards) {
        this.cards = cards;
        this.execute = this.execute.bind(this);
    }

    execute() {
        this.cards.forEach(i => {
            i.flip();
        });
    }
}