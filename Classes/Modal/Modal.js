import DOMObject from '../DOMObject/DOMObject';
import ModalPage from '../ModalPage/ModalPage';
import './Modal.css';

//Must allow for the addition of multiple DOM objects.
//Must allow for cancel and OK options.

//Modal Types
    // "OK"
    // "OKCancel"
    // "Close"

export default class Modal extends DOMObject {
    constructor(currentGame, id_str) {
        super(id_str, "div", document.body, false, ["modal"], null);
        this.currentGame = currentGame;
        this.innerText = "";
        this.pages = [];
        this.addPage = this.addPage.bind(this);
        this.buildModal();
    }

    addPage() {
        let page1 = new ModalPage(this.children[0].object, 1, "Web Solitare 2", []);
        console.log(this.children[0]);
        this.children[0].children.push(page1);
    }

    buildModal() {
        this.build();

        //Add children elements
        this.children.push(new DOMObject("modalInner", 'div', this.object, false, ["modalInner"]));
        this.buildChildren();
        this.addPage();
    }
}