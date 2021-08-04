import DOMObject from "../DOMObject/DOMObject";
import "./ModalPage.css";

export default class ModalPage extends DOMObject {
    constructor(parent_dom, pageNumber, title, paragraphs, image = null) {
        super(parent_dom.id + pageNumber, "div", parent_dom, false, ["modalPage"]);
        this.title = title;
        this.paragraphs = paragraphs;
        this.image = image;
        this.buildModalPage = this.buildModalPage.bind(this);
        this.buildModalPage();
    }

    buildModalPage() {
        this.innerHTML = `<h1>Web Solitare 2</h1>
        <p>Welcome to the second iteration of this web based game.</p>
        <p>There are two ways of playing this game, you an either drag and drop, or you can double click and the cards will move automaticially.</p>
        <h3>Three options for game play;</h3>
        <ul>
            <li>Random: the deck is randomly shuffled. Good luck!</li>
            <li>Solvable: this deck has been solved by another user, see if you can do it.</li>
            <li>Replay: If you get stuck on your current deck, click this button and start over.</li>
        </ul>
        <h3>Technologies used in making this game;</h3>
        <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>Javascript</li>
            <li><a href="https://webpack.js.org/">Webpack</a></li>
            <li><a href="https://babeljs.io/">Babel</a></li>
            <li><a href="https://webpack.js.org/loaders/style-loader/">Style-Loader</a></li>
        </ul>
        
        <h3>For more of my projects visit <a href="https://mrlesbomar.com"> my personal website.</a></h3>
        <h3>If you want to peep the source code visit my <a href="https://github.com/MrBomar/solitare3">Github</a>`;

        this.build();
    }
}