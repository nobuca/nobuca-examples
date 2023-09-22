

export default class BlenderGeometryVertex {

    setX(x) {
        this.x = x;
        return this;
    }

    getX() {
        return this.x;
    }

    setY(y) {
        this.y = y;
        return this;
    }

    getY() {
        return this.y;
    }

    setZ(z) {
        this.z = z;
        return this;
    }

    getZ() {
        return this.z;
    }

    setXYZ(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    setUV(u,v) {
        this.u = u;
        this.v = v;
        return this;
    }

    setU(u) {
        this.u = u;
        return this;
    }

    getU() {
        return this.u;
    }

    setV(v) {
        this.v = v;
        return this;
    }

    getV() {
        return this.v;
    }
}