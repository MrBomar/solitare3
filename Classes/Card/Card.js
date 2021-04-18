import Conversion from '../../Methods/Conversions';
import DOMObject from '../DOMObject/DOMObject';
import './Card.css';

export default class Card extends DOMObject {
    constructor(currentGame, id_str, parent_dom, face_bool = false) {
        super(id_str, 'div', parent_dom, false, ['card']);
        this.backgroundColor = 'black';
        this.currentGame = currentGame;
        this.fixedPOS = {left: 0, top: 0};
        this.tempPOS = {left: 0, top: 0};
        this.face = face_bool;
        this.buildCard = this.buildCard.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.flip = this.flip.bind(this);
        this.getColor = this.getColor.bind(this);
        this.getSuite = this.getSuite.bind(this);
        this.getValue = this.getValue.bind(this);
        this.buildCard();
    }

    buildCard() {
        //Add any bound methods before executing build();
        this.addEventListener({action:'mousedown', method: this.onMouseDown});
        this.addEventListener({action:'mousemove', method: this.onMouseMove});
        this.addEventListener({action:'mouseup', method: this.onMouseUp});
        this.build();

        //Build element children
        this.children.push(new DOMObject(this.id + 'TopLeft', 'h2', this.object, false, ['cardTopLeft'], Conversion.ToFaceValue(this.id.charAt(1))));
        this.children.push(new DOMObject(this.id + 'TopRight', 'h2', this.object, false, ['cardTopRight'], Conversion.ToSymbol(this.id.charAt(0))));
        this.children.push(new DOMObject(this.id + 'Middle', 'h1', this.object, false, ['cardMiddle'], Conversion.ToSymbol(this.id.charAt(0))));
        this.children.push(new DOMObject(this.id + 'BottomLeft', 'h2', this.object, false, ['cardBottomLeft'], Conversion.ToSymbol(this.id.charAt(0))));
        this.children.push(new DOMObject(this.id + 'BottomRight', 'h2', this.object, false, ['cardBottomRight'], Conversion.ToFaceValue(this.id.charAt(1))));
        this.children.forEach(i=>i.build());

        //Display the proper side
        this.addCSSClass((this.face)?'face':'rear');
        this.addCSSClass(this.id.charAt(0));
    }

    onMouseDown(e) {
        this.currentGame.onCardMouseDown(this.id, {left: e.clientX, top: e.clientY});
    }

    onMouseUp(e) {
        this.currentGame.onCardMouseUp(e);
    }

    flip(face = null, mode) {
        let test = (face == null) ? this.face : !face; 
        if(test){
            this.removeCSSClass('face');
            if(!this.hasCSSClass('rear')) this.addCSSClass('rear');
            this.face = false;
        } else {
            this.removeCSSClass('rear');
            if(!this.hasCSSClass('face')) this.addCSSClass('face');
            this.face = true;
        }
    }

    getColor() {
        let suite = this.getSuite();
        return (suite == 'S' || suite == 'C')? 'black': 'red';
    }

    getSuite() {
        return this.id.charAt(0);
    }

    getValue() {
        return this.id.charAt(1);
    }
}