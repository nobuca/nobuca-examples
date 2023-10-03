import NobucaComponentView from "../../../../nobuca-core/component/NobucaComponentView.js";
import NobucaFactory from "../../../../nobuca-core/factory/NobucaFactory.js";


export default class EclipseWindowPartViewView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.createSpecificButtonbarView();
    }

    createSpecificButtonbarView() {

        this.divSpecificButtonbar = document.createElement("div");
        this.getNativeElement().appendChild(this.divSpecificButtonbar);
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

}