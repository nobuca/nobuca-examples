import NobucaComponentView from "../../../../nobuca-core/component/NobucaComponentView.js";
import NobucaFactory from "../../../../nobuca-core/factory/NobucaFactory.js";

export default class EclipseOutlineView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.createButtonbarView();
        this.createTreeView();
    }

    getClassName() {
        return "EclipseOutline";
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


}