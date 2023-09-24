
export default class BlenderGeometryData {

    constructor() {
        this.geometryTriangles = [];
    }

    createGeometryTriangles() {
    }

    getGeometryTriangles() {
        return this.geometryTriangles;
    }

    addGeometryTriangle(geometryTriangle) {
        this.getGeometryTriangles().push(geometryTriangle);
    }
}