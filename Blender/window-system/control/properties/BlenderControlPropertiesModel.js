import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js";


export default class BlenderControlPropertiesModel extends NobucaComponentModel {

    constructor() {
        super();
        this.tabs = [];
    }

    getClassName() {
        return "BlenderControlPropertiesModel";
    }

    getTabs() {
        return this.tabs;
    }

    addTab(tab) {
        this.getTabs().push(tab);
        return tab;
    }

}