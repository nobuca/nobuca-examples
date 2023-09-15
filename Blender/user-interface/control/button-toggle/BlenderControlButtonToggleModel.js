import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js";

export default class BlenderControlButtonToggleModel extends NobucaComponentModel {

    constructor() {
        super();
        this.items = [];
    }

    getClassName() {
        return "BlenderControlButtonToggleModel";
    }

    getItems() {
        return this.items;
    }
    
    addItem(item) {
        this.getItems().push(item);
    }

    setDropDown(dropDown) {
        this.dropDown = dropDown;
    }

    getDropDown() {
        return this.dropDown;
    }

}