import BlenderMatrix4 from "../math/BlenderMatrix4.js";

export default class BlenderCamera {

    constructor() {
        this.viewMatrix = new BlenderMatrix4();
    }

    getViewMatrix() {
        return this.viewMatrix
    }
}