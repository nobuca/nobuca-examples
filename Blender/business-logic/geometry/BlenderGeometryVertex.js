

export default class BlenderGeometryVertex {

    setX(x) {
        this.x = x;
        return this;
    }

    getX() {
        return this.x;
    }

    incrementX(x) {
        this.x += x;
        return this;
    }

    setY(y) {
        this.y = y;
        return this;
    }

    incrementY(y) {
        this.y += y;
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

    incrementZ(z) {
        this.z += z;
        return this;
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

    setNx(nx) {
        this.nx = nx;
        return this;
    }

    incrementNx(nx) {
        this.nx += nx;
        return this;
    }

    getNx() {
        return this.nx;
    }

    setNy(ny) {
        this.ny = ny;
        return this;
    }

    getNy() {
        return this.ny;
    }

    setNz(nz) {
        this.nz = nz;
        return this;
    }

    getNz() {
        return this.nz;
    }

    setNormalXYZ(nx, ny, nz) {
        this.nx = nx;
        this.ny = ny;
        this.nz = nz;
    }

    copyFromVertex(vertex) {
        this.setX(vertex.getX());
        this.setY(vertex.getY());
        this.setZ(vertex.getZ());
        this.setU(vertex.getU());
        this.setV(vertex.getV());
        this.setNx(vertex.getNx());
        this.setNy(vertex.getNy());
        this.setNz(vertex.getNz());
    }
}