
export default class EclipseProjectEntry {

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