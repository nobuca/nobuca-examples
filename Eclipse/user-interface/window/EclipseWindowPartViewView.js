import NobucaComponentView from "../../../../nobuca-core/component/NobucaComponentView.js";
import NobucaFactory from "../../../../nobuca-core/factory/NobucaFactory.js";
import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";


export default class EclipseWindowPartViewView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.createSpecificButtonbarView();
        this.createContent();
    }

    getClassName() {
        return "EclipseWindowPartView";
    }

    createSpecificButtonbarView() {

        this.divSpecificButtonbar = document.createElement("div");
        this.divSpecificButtonbar.className = "EclipseWindowPartContainerStackSpecificButtonbar";

        this.specificButtonbarView = NobucaFactory.createNewViewForModel(this.getModel().getButtonbar());
        this.getDivSpecificButtonbar().appendChild(this.getSpecificButtonbarView().getNativeElement());
    }

    getDivSpecificButtonbar() {
        return this.divSpecificButtonbar;
    }

    getSpecificButtonbarView() {
        return this.specificButtonbarView;
    }

    createContent() {
        this.contentView = NobucaFactory.createNewViewForModel(this.getModel().getContent());
        this.getNativeElement().appendChild(this.getContentView().getNativeElement());
    }

    getContentView() {
        return this.contentView;
    }

    updateContentsPositionAndSize() {

        var contentHeight = this.getNativeElement().offsetHeight ;
        var contentWidth = this.getNativeElement().offsetWidth;

        this.getContentView().getNativeElement().style.height = contentHeight + "px";
        this.getContentView().getNativeElement().style.width = contentWidth + "px";
        this.getContentView().updateContentsPositionAndSize();
    }

}