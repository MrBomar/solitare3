import DOMObject from '../DOMObject/DOMObject';
import './MenuButton.css';

export default class MenuButton extends DOMObject {
    constructor(id_str, parent_dom, eventListeners_arr_obj, innerText) {
        super(id_str + 'Button', 'h1', parent_dom, eventListeners_arr_obj, ['menuButton'], innerText);
        this.build();
    }
}