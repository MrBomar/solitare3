//import Test from '../../Testing/Testing';

export default class DOMObject {
    constructor(id_str, type_str, parent_dom, eventListeners_arr_obj = false, cssClasses_arr_str = false, innerText = null) {
        this.children = [];
        this.cssClasses = cssClasses_arr_str;
        this.eventListeners = eventListeners_arr_obj;
        this.fixedPOS = {left: 0, top: 0};
        this.id = id_str;
        this.innerText = innerText;
        this.parent = parent_dom;
        this.type = type_str;
        this.object = false;
        this.zIndex = 0;
        this.addAllCSSClasses = this.addAllCSSClasses.bind(this);
        this.addCSSClass = this.addCSSClass.bind(this);
        this.addEventListener = this.addEventListener.bind(this);
        this.addEventListeners = this.addEventListeners.bind(this);
        this.build = this.build.bind(this);
        this.destroy = this.destroy.bind(this);
        this.removeCSSClass = this.removeCSSClass.bind(this);
        this.removeEventListeners = this.removeEventListeners.bind(this);
        this.getDimensions = this.getDimensions.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.getLeft = this.getLeft.bind(this);
        this.getPOS = this.getPOS.bind(this);
        this.getTop = this.getTop.bind(this);
        this.getWidth = this.getWidth.bind(this);
        this.getZIndex = this.getZIndex.bind(this);
        this.hasCSSClass = this.hasCSSClass.bind(this);
        this.moveHorizontal = this.moveHorizontal.bind(this);
        this.moveVerticle = this.moveVerticle.bind(this);
        this.setFixedLeft = this.setFixedLeft.bind(this);
        this.setFixedPOS = this.setFixedPOS.bind(this);
        this.setFixedTop = this.setFixedTop.bind(this);
        this.setTempLeft = this.setTempLeft.bind(this);
        this.setTempPOS = this.setTempPOS.bind(this);
        this.setTempTop = this.setTempTop.bind(this);
        this.setZIndex = this.setZIndex.bind(this);
    }

    addAllCSSClasses() {
        if(this.cssClasses){
            this.cssClasses.forEach(i=>{
                this.object.classList.add(i);
            })
        }
    }

    addCSSClass(className) {
        this.cssClasses.push(className);
        if(this.object) this.object.classList.add(className);
    }

    addEventListener(i_obj) {
        if(this.eventListeners) {
            this.eventListeners.push(i_obj);
        } else {
            this.eventListeners = [i_obj];
        }
    }

    addEventListeners() {
        if(this.eventListeners){
            this.eventListeners.forEach(i=>{
                this.object.addEventListener(i.action, i.method);
            })
        }
    }

    build() {
        let me = document.createElement(this.type);
        me.id = this.id;
        if(this.innerText != null) me.innerText = this.innerText;
        this.parent.appendChild(me);
        this.object = me;
        this.addAllCSSClasses();
        this.addEventListeners();
    }

    destroy() {
        this.removeEventListeners();
        if(this.children.length > 0) this.children.forEach(i=>i.destroy()); 
        this.parent.removeChild(this.object);

    }

    getDimensions() {
        return {top: this.getTop(), right: this.getLeft() + this.getWidth(), bottom: this.getTop() + this.getHeight(), left: this.getLeft()};
    }

    getHeight() {
        return this.object.offsetHeight;
    }

    getLeft() {
        return this.object.offsetLeft;
    }

    getPOS() {
        return {left: this.getLeft(), top: this.getTop()};
    }

    getTop() {
        return this.object.offsetTop;
    }

    getWidth() {
        return this.object.offsetWidth;
    }

    getZIndex() {
        return this.zIndex;
    }

    hasCSSClass(str) {
        return this.object.classList.contains(str);
    }

    moveVerticle(pixels) {
        this.object.style.top = this.object.offsetTop + pixels;
    }

    moveHorizontal(pixels) {
        this.object.style.left = this.object.offsetLeft + pixels;
    }

    removeCSSClass(className) {
        let i = this.cssClasses.indexOf(className);
        if(i > -1){
            this.cssClasses.splice(i, 1);
            this.object.classList.remove(className);
        }
    }

    removeEventListeners() {
        if(this.eventListeners) {
            this.eventListeners.forEach(i=>{
                this.object.removeEventListener(i.action, i.method); 
            })
        }
    }

    setFixedLeft(pixels) {
        this.fixedPOS.left = pixels;
        this.object.style.left = `${pixels}px`;
    }

    setFixedPOS(left, top) {
        this.fixedPOS.left = left;
        this.fixedPOS.top = top;
        this.object.style.left = `${left}px`;
        this.object.style.top = `${top}px`;
    }

    setFixedTop(pixels) {
        this.fixedPOS.top = pixels;
        this.object.style.top = `${pixels}px`;
    }

    setTempLeft(pixels) {
        this.object.style.left = `${pixels}px`;
    }

    setTempPOS(left, top) {
        this.object.style.left = `${left}px`;
        this.object.style.top = `${top}px`;
    }

    setTempTop(pixels) {
        this.object.style.top = `${pixels}px`;
    }

    setZIndex(int) {
        this.zIndex = int;
        this.object.style.zIndex = int;
    }
}