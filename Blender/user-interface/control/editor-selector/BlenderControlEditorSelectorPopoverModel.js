import NobucaPopoverModel from "../../../../../nobuca-core/popover/NobucaPopoverModel.js";
import BlenderControlButtonDropDownModel from "../button-drop-down/BlenderControlButtonDropDownModel.js";
import BlenderControlEditorSelectorColumnModel from "./BlenderControlEditorSelectorPopoverColumnModel.js";

export default class BlenderControlEditorSelectorPopoverModel extends NobucaPopoverModel {

    constructor() {
        super();
        this.columns = [];
        this.createColumnsAndEntries();
        this.createEntryClickedEventEmitter();
    }

    getClassName() {
        return "BlenderControlEditorSelectorPopoverModel";
    }

    createEntryClickedEventEmitter() {
        this.entryClickedEventEmitter = this.createEventEmitter();
    }

    getEntryClickedEventEmitter() {
        return this.entryClickedEventEmitter;
    }

    createColumnsAndEntries() {
        var general = this.createColumn("General");
        general.addEntry("3dViewport", "./user-interface/icons/icon-editor-3dviewport.svg", "3<u>D</u> Viewport", "Shift F5");
        general.addEntry("image", "./user-interface/icons/icon-editor-image.svg", "<u>I</u>mage Editor", "Shift F10");
        general.addEntry("uv", "./user-interface/icons/icon-editor-uv.svg", "<u>U</u>V Editor", "Shift F10");

        var animation = this.createColumn("Animation");
        animation.addEntry("timeline", "./user-interface/icons/icon-editor-timeline.svg", "Time<u>l</u>ine", "Shift F12");

        var scripting = this.createColumn("Scripting");
        scripting.addEntry("console", "./user-interface/icons/icon-editor-console.svg", "<u>P</u>ython Console", "Shift F4");

        var data = this.createColumn("Data");
        data.addEntry("outliner", "./user-interface/icons/icon-editor-outliner.svg", "<u>O</u>utliner", "Shift F9");
        data.addEntry("properties", "./user-interface/icons/icon-editor-properties.svg", "Properties", "Shift F7");
    }

    getColumns() {
        return this.columns;
    }

    createColumn(name) {
        var column = new BlenderControlEditorSelectorColumnModel(name);
        this.getColumns().push(column);
        return column;
    }

}
