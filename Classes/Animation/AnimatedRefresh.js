import Animation from './Animation';

export default class AnimatedRefresh extends Animation {
    constructor(currentGame, selection, target) {
        super(currentGame, selection, target);
        this.execute = this.execute.bind(this);
    }

    execute() {
        this.selection.pile.refresh();
        this.target.refresh();
    }
}