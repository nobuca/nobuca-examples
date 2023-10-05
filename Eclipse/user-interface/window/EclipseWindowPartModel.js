import NobucaComponentModel from "../../../../nobuca-core/component/NobucaComponentModel.js";

export default class EclipseWindowPartModel extends NobucaComponentModel {

    constructor() {
        super();
        this.setTitle("Default");
        this.setCloseable("true");
        this.setImageSrc("./user-interface/icons/defaultview_misc.svg");
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    getTitle() {
        return this.title;
    }

    setImageSrc(imageSrc) {
        this.imageSrc = imageSrc;
        return this;
    }

    getImageSrc() {
        return this.imageSrc;
    }

    getDirty() {
        return this.dirty;
    }

    setDirty(dirty) {
        this.dirty = dirty;
        return this;
    }

    getCloseable() {
        return this.closeable;
    }

    setCloseable(closeable) {
        this.closeable = closeable;
        return this;
    }
}