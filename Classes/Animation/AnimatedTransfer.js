import Animation from './Animation';

export default class AnimatedTransfer extends Animation {
    constructor(currentGame, selection, target, type){
        super(currentGame, selection, target);
        this.type = type;
        this.execute = this.execute.bind(this);
    }

    execute() {
        this.transferCards();
    }
}