import BlenderMatrix4 from "../math/BlenderMatrix4.js";
import BlenderMatrix4x4 from "../math/BlenderMatrix4x4.js";
import BlenderVector3 from "../math/BlenderVector3.js";

export default class BlenderCamera {

    constructor() {
        this.viewMatrix = new BlenderMatrix4x4();
    }

    getViewMatrix() {
        return this.viewMatrix
    }
}