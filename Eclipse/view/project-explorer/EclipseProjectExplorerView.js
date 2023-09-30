import NobucaComponentView from "../../../../nobuca-core/component/NobucaComponentView.js";
import NobucaFactory from "../../../../nobuca-core/factory/NobucaFactory.js";

export default class EclipseProjectExplorerView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.createButtonbarView();
        this.createTreeView();
    }

    getClassName() {
        return "EclipseProjectExplorer";
    }

    createButtonbarView() {
        this.buttonbarView = NobucaFactory.createNewViewForModel(this.getModel().getButtonbar());
        this.getNativeElement().appendChild(this.buttonbarView.getNativeElement());
    }

    getButtonbarView() {
        return this.buttonbarView;
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

        this.getButtonbarView().getNativeElement().style.height = buttonbarHeight + "px";
        this.getButtonbarView().getNativeElement().style.width = buttonbarWidth + "px";
        this.getButtonbarView().updateContentsPositionAndSize();

        var treeHeight = this.getNativeElement().offsetHeight - buttonbarHeight;
        var treeWidth = this.getNativeElement().offsetWidth;

        this.getTreeView().getNativeElement().style.height = treeHeight + "px";
        this.getTreeView().getNativeElement().style.width = treeWidth + "px";
        this.getTreeView().updateContentsPositionAndSize();
    }
}