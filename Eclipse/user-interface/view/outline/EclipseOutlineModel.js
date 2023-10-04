import NobucaButtonbarItemModel from "../../../../../nobuca-core/buttonbar/NobucaButtonbarItemModel.js";
import NobucaTreeModel from "../../../../../nobuca-core/tree/NobucaTreeModel.js";
import EclipseWorkspace from "../../../buiness-logic/EclipseWorkspace.js";
import EclipseWindowPartViewModel from "../../window/EclipseWindowPartViewModel.js";

export default class EclipseOutlineModel extends EclipseWindowPartViewModel {

    constructor() {
        super();
        this.setTitle("Outline");
        this.setImageSrc("./user-interface/icons/outline_co.svg");
        this.setCloseable(true);
        this.createTree();
    }

    customizeButtonbar() {
        this.getButtonbar().addItem(new NobucaButtonbarItemModel("./user-interface/icons/e_collapseall.svg"));
        this.getButtonbar().addItem(new NobucaButtonbarItemModel("./user-interface/icons/e_auto_synch_toc.svg"));
        this.getButtonbar().addItem(new NobucaButtonbarItemModel("./user-interface/icons/filter_ps.svg"));
    }

    createTree() {
        this.tree = new NobucaTreeModel();
        EclipseWorkspace.getCurrentWorkspace().getProjects().forEach(project => {
            this.addNodeProject(project);
        });
    }

    getTree() {
        return this.tree;
    }

    getContent() {
        return this.getTree();
    }
}