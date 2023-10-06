import NobucaTextAreaModel from "../../../../../nobuca-core/text-area/NobucaTextAreaModel.js";
import EclipseWindowPartViewModel from "../../window/EclipseWindowPartViewModel.js";

export default class EclipseTextEditorModel extends EclipseWindowPartViewModel {

    constructor() {
        super();
        this.setTitle("Text Editor");
        this.setCloseable(true);
        this.createTextArea();
    }

    createTextArea() {
        this.textArea = new NobucaTextAreaModel();
    }

    getTextArea() {
        return this.textArea;
    }

    getContent() {
        return this.getTextArea();
    }
}