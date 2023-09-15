import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js"
import BlenderControlConsoleEntryModel from "./BlenderControlConsoleEntryModel.js";

export default class BlenderControlConsoleModel extends NobucaComponentModel {

    constructor() {
        super();
        this.entries = [];
    }

    getClassName() {
        return "BlenderControlConsoleModel";
    }

    getEntries() {
        return this.entries;
    }

    addEntry(timestamp, severity, text) {
        var entry = new BlenderControlConsoleEntryModel(timestamp, severity, text);
        this.getEntries().push(entry);
    }
}