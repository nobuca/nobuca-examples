import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js";

export default class BlenderDataBlockMenuModel extends NobucaComponentModel {

    constructor(type) {
        super();
        this.type = type;
    }

    getClassName() {
        return "BlenderDataBlockMenuModel";
    }

    getType() {
        return this.type;
    }
}