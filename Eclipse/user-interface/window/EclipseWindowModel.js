import NobucaComponentModel from "../../../../nobuca-core/component/NobucaComponentModel.js";

export default class EclipseWindowModel extends NobucaComponentModel {

    getClassName() {
        return "EclipseWindowModel"
    }

    setPartContiner(partContainer) {
        this.partContainer = partContainer;
        return this.partContainer;
    }

    getPartContainer() {
        return this.partContainer;       
    }
}