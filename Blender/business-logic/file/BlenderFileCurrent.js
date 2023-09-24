
export default class BlenderFileCurrent {

    static setFile(file) {
        BlenderFileCurrent.file = file;
        return file;
    }

    static getFile() {
        return BlenderFileCurrent.file;
    }
}