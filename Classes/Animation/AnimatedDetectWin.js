export default class AnimatedDetectWin {
    constructor(currentGame) {
        this.currentGame = currentGame;
        this.execute = this.execute.bind(this);
    }

    execute() {
        this.currentGame.detectWin();
    }
}