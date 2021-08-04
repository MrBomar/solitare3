export default class Image {
    constructor(src, alt, parent = null, cssClasses_arr_str = null, id_str = null, h = null, w = null) {
        this.src = src;
        this.alt = alt;
        this.parent = parent;
        this.cssClasses = cssClasses_arr_str;
        this.id = id_str;
        this.h = h;
        this.w = w;
    }

    getStr() {
        let str = `<img src="${src}" alt="${alt}"`;
        if(!this.cssClasses === null) {
            let classStr = ` class="`
            this.cssClasses.forEach(i => {
                classStr += i + " ";
            });
            classStr += `"`;
            str += classStr;
        }
        if (!this.id === null) str += ` id="${this.id}"`;
        if (!this.h === null) str += ` height="${this.h}"`;
        if (!this.w === null) str += ` width="${this.w}"`;

        str += `>`;
        return str;
    }
}