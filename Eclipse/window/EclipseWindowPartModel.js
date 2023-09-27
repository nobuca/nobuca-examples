import NobucaComponentModel from "../../../nobuca-core/component/NobucaComponentModel.js";

export default class EclipseWindowPartModel extends NobucaComponentModel {

    constructor() {
        this.dirty = false;
    }

    getDirty() {
        return this.dirty;
    }

    setDirty(dirty) {
        this.dirty = dirty;
    }
}