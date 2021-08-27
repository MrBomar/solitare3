import Tableau from '../Tableau/Tableau';

export default class Animation {
    constructor(currentGame, selection, target) {
        this.currentGame = currentGame;
        this.frameData = null; //property set at build()
        this.frames = []; //This array will store the frames before they are executed.
        this.framesNeeded = 0; //This property will be used to generate the frames needed.
        this.posData = null; //property set at build()
        this.selection = selection;
        this.target = target;
        this.execute = this.execute.bind(this);
        this.executionMethod = this.executionMethod.bind(this);
        this.setFrameData = this.setFrameData.bind(this);
        this.setPOSData = this.setPOSData.bind(this);
        this.transferCards = this.transferCards.bind(this);
    }

    execute() {
        this.executionMethod();
    }

    executionMethod() {
        //This method will run on each frame
        if(this.frames.length > 0) {
            this.frames.shift().execute();
        } else {
            let i = this.currentGame.animations.indexOf(this);
            this.currentGame.animations.splice(i, 1);
        }
    }
    
    //Maybe change this function name to 'calculateFrames'
    setFrameData() {
        //FIX ME - Change this to capture and store the number of frames needed in Animation.framesNeeded.
        //FIX ME - We will change the animation process to have each frame calculate it's own movement.
        let xMaxPixelsPerFrame = window.innerWidth / (this.currentGame.animationFrameRate * this.currentGame.animationLength);
        let yMaxPixelsPerFrame = window.innerHeight / (this.currentGame.animationFrameRate * this.currentGame.animationLength);
        let transX = this.posData.endLeft - this.posData.startLeft;
        let transY = this.posData.endTop - this.posData.startTop;
        let framesX = Math.abs(transX / xMaxPixelsPerFrame);
        let framesY = Math.abs(transY / yMaxPixelsPerFrame);
        let totalFrames = Math.round((framesX > framesY)? framesX : framesY);    
        let pixelsPerFrameX = Math.round(transX / totalFrames);
        let pixelsPerFrameY = Math.round(transY / totalFrames); 
        //Change the below variable name to 'framesNeeded'
        this.frameData =  {xPixels: pixelsPerFrameX, yPixels: pixelsPerFrameY, frames: totalFrames};
    }

    setPOSData() {
        console.log(this.target);
        let posData = {startLeft: this.selection.cards[0].getLeft(), startTop: this.selection.cards[0].getTop(), endLeft: this.target.getLeft(), endTop: this.target.getTop()};
        
        if(this.target instanceof Tableau) { //Modify end position if target is Tableau
            let endPOS = this.target.nextCardPOS();
            posData.endLeft = endPOS.left;
            posData.endTop = endPOS.top;
        }
        this.posData = posData;
    }

    
    transferCards() {
        let selectedCards = this.selection.pile.cards.splice(this.selection.index, this.selection.cards.length);
        if(this.type === 'restock') selectedCards.reverse();
        this.target.cards = this.target.cards.concat(selectedCards);
    }
}