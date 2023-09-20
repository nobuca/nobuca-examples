import BlenderVector3 from "../math/BlenderVector3.js";
import BlenderVertexArray from "./BlenderVertexArray.js";

export default class BlenderPoint {

    setX(x) {
        this.x = x;
    }

    getX() {
        return this.x;
    }

    setY(y) {
        this.y = y;
    }

    getY() {
        return this.y;
    }

    setZ(z) {
        this.z = z;
    }

    getZ() {
        return this.z;
    }

    setXYZ(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}