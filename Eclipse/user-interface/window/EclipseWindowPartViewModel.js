import NobucaButtonbarModel from "../../../../nobuca-core/buttonbar/NobucaButtonbarModel.js";
import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";
import EclipseWindowPartModel from "./EclipseWindowPartModel.js";

export default class EclipseWindowPartViewModel extends EclipseWindowPartModel {

    constructor() {
        super();
        this.createButtonbar();
        this.customizeButtonbar();
        this.createContent();
    }

    getClassName() {
        return "EclipseWindowPartViewModel";
    }

    createButtonbar() {
        this.buttonbar = new NobucaButtonbarModel();
    }

    customizeButtonbar() {
    }

    getButtonbar() {
        return this.buttonbar;
    }

    createContent() {
        var content = new NobucaPanelModel();
        this.setContent(content);
    }

    setContent(content) {
        this.content = content;
    }

    getContent() {
        return this.content;
    }
   
}