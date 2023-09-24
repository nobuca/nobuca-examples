
export default class BlenderFileCurrent {

    static setFile(file) {
        BlenderFileCurrent.file = file;
    }

    static getFile() {
        return BlenderFileCurrent.file;
    }
}