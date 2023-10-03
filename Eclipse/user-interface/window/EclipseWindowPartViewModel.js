import NobucaButtonbarItemModel from "../../../../nobuca-core/buttonbar/NobucaButtonbarItemModel.js";
import NobucaButtonbarModel from "../../../../nobuca-core/buttonbar/NobucaButtonbarModel.js";
import EclipseWindowPartModel from "./EclipseWindowPartModel.js";

export default class EclipseWindowPartViewModel extends EclipseWindowPartModel {

    constructor() {
        super();
        this.createButtonbar();
        this.customizeButtonbar();
    }

    createButtonbar() {
        this.buttonbar = new NobucaButtonbarModel();
    }

    customizeButtonbar() {
    }

    getButtonbar() {
        return this.buttonbar;
    }


   
}