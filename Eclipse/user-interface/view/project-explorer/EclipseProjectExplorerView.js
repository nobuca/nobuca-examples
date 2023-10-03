import NobucaFactory from "../../../../../nobuca-core/factory/NobucaFactory.js";
import EclipseWindowPartViewView from "../../window/EclipseWindowPartViewView.js";

export default class EclipseProjectExplorerView extends EclipseWindowPartViewView {

    constructor(model) {
        super(model);
        this.createTreeView();
    }

    getClassName() {
        return "EclipseProjectExplorer";
    }

    createTreeView() {
        this.treeView = NobucaFactory.createNewViewForModel(this.getModel().getTree());
        this.getNativeElement().appendChild(this.treeView.getNativeElement());
    }

    getTreeView() {
        return this.treeView;
    }

    updateContentsPositionAndSize() {

        var buttonbarHeight = 20;
        var buttonbarWidth = this.getNativeElement().offsetWidth;

        //this.getSpecificButtonbarView().getNativeElement().style.height = buttonbarHeight + "px";
        //this.getSpecificButtonbarView().getNativeElement().style.width = buttonbarWidth + "px";
        //this.getSpecificButtonbarView().updateContentsPositionAndSize();

        var treeHeight = this.getNativeElement().offsetHeight - buttonbarHeight;
        var treeWidth = this.getNativeElement().offsetWidth;

        this.getTreeView().getNativeElement().style.height = treeHeight + "px";
        this.getTreeView().getNativeElement().style.width = treeWidth + "px";
        this.getTreeView().updateContentsPositionAndSize();
    }
}