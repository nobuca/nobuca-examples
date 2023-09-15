import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js"
import BlenderLogger from "../../../business-logic/logger/BlenderLogger.js";
import BlenderControlConsoleEntryModel from "./BlenderControlConsoleEntryModel.js";

export default class BlenderControlConsoleModel extends NobucaComponentModel {

    constructor() {
        super();
        this.entries = [];

        BlenderLogger.getLogAddedEventEmitter().subscribe(entry => {
            this.addEntry(entry.getTimestamp(), entry.getSeverity(), entry.getText());
        });

        this.entryAddedEventEmitter = this.createEventEmitter();
    }

    getClassName() {
        return "BlenderControlConsoleModel";
    }

    getEntryAddedEventEmitter() {
        return this.entryAddedEventEmitter;
    }

    getEntries() {
        return this.entries;
    }

    addEntry(timestamp, severity, text) {
        var entry = new BlenderControlConsoleEntryModel(timestamp, severity, text);
        this.getEntries().push(entry);
        this.getEntryAddedEventEmitter().emit(entry);
    }
}