import NobucaLabelModel from "../../../nobuca-core/label/NobucaLabelModel.js";
import NobucaPanelModel from "../../../nobuca-core/panel/NobucaPanelModel.js";

export default class EclipseWindowPartContainerStackModel extends NobucaPanelModel {

    constructor() {
        super();
        this.addChild(new NobucaLabelModel("test"));
    }
}