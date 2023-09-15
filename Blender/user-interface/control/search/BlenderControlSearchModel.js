import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js";

export default class BlenderControlSearchModel extends NobucaComponentModel {

    constructor() {
        super();
        this.text = "";
    }

    getClassName() {
        return "BlenderControlSearchModel";
    }

    setText(text) {
        this.text = text;
    }

    getText() {
        return this.text;
    }

}