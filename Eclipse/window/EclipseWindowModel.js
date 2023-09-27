import NobucaComponentModel from "../../../nobuca-core/component/NobucaComponentModel.js";
import NobucaMenuModel from "../../../nobuca-core/menu/NobucaMenuModel.js";

export default class EclipseWindowModel extends NobucaComponentModel {

    constructor() {
        super();
        this.createMenu();
        this.createToolbarContainer();
    }

    getClassName() {
        return "EclipseWindowModel"
    }

    createMenu() {
        this.menu = new NobucaMenuModel();
    }

    createToolbarContainer() {

    }

    createPartContainer() {
    }

    setPartContiner(partContainer) {
        this.partContainer = partContainer;
        return this.partContainer;
    }

    getPartContainer() {
        return this.partContainer;       
    }
}