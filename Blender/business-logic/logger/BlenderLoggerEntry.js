

export default class BlenderLoggerEntry {

    constructor(timestamp, severity, text) {
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