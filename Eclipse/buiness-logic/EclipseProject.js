import NobucaEventEmitter from "../../../nobuca-core/event/NobucaEventEmitter.js";

export default class EclipseProject {

    constructor() {
        this.entries = [];
        this.entryAddedEventEmitter = new NobucaEventEmitter();
    }

    getEntries() {
        return this.entries;
    }

    getEntryAddedEventEmitter() {
        return this.entryAddedEventEmitter;
    }

    addEntry(entry) {
        this.entries.push(entry);
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setDirectory(directory) {
        this.directory = directory;
    }

    getDirectory() {
        return this.directory;
    }
}