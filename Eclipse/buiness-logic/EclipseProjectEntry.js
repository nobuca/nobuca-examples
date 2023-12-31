import NobucaEventEmitter from "../../../nobuca-core/event/NobucaEventEmitter.js";

export default class EclipseProjectEntry {

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

    isDirectory() {
        return this.getDirectory() != null;
    }

    isFile() {
        return this.getFile() != null;
    }

    setDirectory(directory) {
        this.directory = directory;
    }

    getDirectory() {
        return this.directory;
    }

    setFile(file) {
        this.file = file;
    }

    getFile() {
        return this.file;
    }
}