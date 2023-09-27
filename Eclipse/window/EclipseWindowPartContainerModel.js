import NobucaComponentModel from "../../../nobuca-core/component/NobucaComponentModel.js";

export default class EclipsePartContainerModel extends NobucaComponentModel{

    constructor() {
        super();
        this.parts = [];
    }

    getParts() {
        return this.parts;
    }

    addPart(part) {
        this.parts.push(part);
    }
}