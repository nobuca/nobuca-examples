import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js";

export default class BlenderControlToolbarModel extends NobucaComponentModel {

    constructor() {
        super();
        this.menus = [];
    }

    getClassName() {
        return "BlenderControlToolbarModel";
    }

    addMenu(menu) {
        this.menus.push(menu);
    }

    getMenus() {
        return this.menus;
    }

}