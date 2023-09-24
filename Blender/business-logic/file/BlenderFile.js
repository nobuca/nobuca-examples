import BlenderFileContents from "./BlenderFileContents.js";

export default class BlenderFile {

    constructor() {
        this.contents = new BlenderFileContents();
    }

    getContents() {
        return this.contents;
    }
}