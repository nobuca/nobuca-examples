import BlenderMatrix4 from "../math/BlenderMatrix4.js";
import BlenderVector3 from "../math/BlenderVector3.js";

export default class BlenderCamera {

    constructor() {
        this.matrix = (new BlenderMatrix4()).identity();
        this.right = (new BlenderVector3()).setValues(new Float32Array(this.matrix.values.buffer, 4 * 0, 4));
        this.up = (new BlenderVector3()).setValues(new Float32Array(this.matrix.values.buffer, 4 * 4, 4));
        this.back = (new BlenderVector3()).setValues(new Float32Array(this.matrix.values.buffer, 4 * 8, 4));
        this.position = (new BlenderVector3()).setValues(new Float32Array(this.matrix.values.buffer, 4 * 12, 4));
        this.viewMatrix = (new BlenderMatrix4()).identity();
    }

    getMatrix() {
        return this.matrix;
    }

    getUp() {
        return this.up;
    }

    getRight() {
        return this.right;
    }

    getBack() {
        return this.back;
    }

    getPosition() {
        return this.position;
    }

    getViewMatrix() {
        return this.viewMatrix
    }
}