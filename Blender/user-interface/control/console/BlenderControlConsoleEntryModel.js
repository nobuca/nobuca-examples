import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js"

export default class BlenderControlConsoleEntryModel extends NobucaComponentModel {

    constructor(timestamp, severity, text) {
        super();
        this.timestamp = timestamp;
        this.severity = severity;
        this.text = text;
    }

    getTimestamp() {
        return this.timestamp;
    }

    getSeverity() {
        return this.severity;
    }

    getText() {
        return this.text;
    }
}