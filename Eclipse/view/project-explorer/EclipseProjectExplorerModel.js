import NobucaButtonbarModel from "../../../../nobuca-core/buttonbar/NobucaButtonbarModel.js";
import NobucaTreeModel from "../../../../nobuca-core/tree/NobucaTreeModel.js";
import EclipseWindowPartViewModel from "../../window/EclipseWindowPartViewModel.js";

export default class EclipseProjectExplorerModel extends EclipseWindowPartViewModel {

    constructor() {
        super();
        this.setTitle("Project Explorer");
        this.setCloseable("true");
        this.createButtonbar();
        this.createTree();
    }

    getClassName() {
        return "EclipseProjectExplorerModel";
    }

    createButtonbar() {
        this.buttonbar = new NobucaButtonbarModel();
    }

    getButtonbar() {
        return this.buttonbar;
    }

    createTree() {
        this.tree = new NobucaTreeModel();
    }

    getTree() {
        return this.tree;
    }


}