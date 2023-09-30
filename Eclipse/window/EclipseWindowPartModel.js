import NobucaComponentModel from "../../../nobuca-core/component/NobucaComponentModel.js";

export default class EclipseWindowPartModel extends NobucaComponentModel {

    constructor() {
        super();
        this.title = "Test";
        this.dirty = false;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    getDirty() {
        return this.dirty;
    }

    setDirty(dirty) {
        this.dirty = dirty;
    }

    getCloseable() {
        return this.closeable;
    }

    setCloseable(closeable) {
        this.closeable = closeable;
    }
}