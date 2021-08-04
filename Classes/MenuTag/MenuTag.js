import DOMObject from '../DOMObject/DOMObject';
import './MenuTag.css';

export default class MenuTag extends DOMObject {
    constructor(id_str, parent_dom, eventListeners_arr_obj, innerText) {
        super(id_str + 'Tag', 'h1', parent_dom, eventListeners_arr_obj, ['menuTag'], innerText);
        this.build();
    }
}