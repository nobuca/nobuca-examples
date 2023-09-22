import BlenderGeometryVertex from "./BlenderGeometryVertex.js";
import BlenderGeometryData from "./BlenderGeometryData.js";

export default class BlenderGeometryDataTriangle extends BlenderGeometryData {

    constructor() {
        super();
        this.vertexA = new BlenderGeometryVertex();
        this.vertexB = new BlenderGeometryVertex();
        this.vertexC = new BlenderGeometryVertex();
    }

    setVertexA(vertexA) {
        this.vertexA = vertexA;
    }

    getVertexA() {
        return this.vertexA;
    }

    setVertexB(vertexB) {
        this.vertexB = vertexB;
    }

    getVertexB() {
        return this.vertexB;
    }

    setVertexC(vertexC) {
        this.vertexC = vertexC;
    }

    getVertexC() {
        return this.vertexC;
    }


}