import NobucaTreeModel from "../../../../../nobuca-core/tree/NobucaTreeModel.js";

export default class BlenderControlOutlinerModel extends NobucaTreeModel {

    constructor() {
        super();
        this.menus = [];
    }

    getClassName() {
        return "BlenderControlOutlinerModel";
    }

    addMenu(menu) {
        this.menus.push(menu);
    }

    getMenus() {
        return this.menus;
    }

}