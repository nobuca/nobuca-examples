import BlenderGeometryVertex from "./BlenderGeometryVertex.js";
import BlenderGeometryData from "./BlenderGeometryData.js";
import BlenderVector3 from "../math/BlenderVector3.js";

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

    recalculateVertexNormals() {

        var vAB = (new BlenderVector3()).setXYZ(
            this.getVertexB().getX() - this.getVertexA().getX(),
            this.getVertexB().getY() - this.getVertexA().getY(),
            this.getVertexB().getZ() - this.getVertexA().getZ());

        var vAC = (new BlenderVector3()).setXYZ(
            this.getVertexC().getX() - this.getVertexA().getX(),
            this.getVertexC().getY() - this.getVertexA().getY(),
            this.getVertexC().getZ() - this.getVertexA().getZ());

        var vN = (new BlenderVector3()).cross(vAB, vAC).normalize();

        this.getVertexA().setNormalXYZ(vN.getX(), vN.getY(), vN.getZ());
        this.getVertexB().setNormalXYZ(vN.getX(), vN.getY(), vN.getZ());
        this.getVertexC().setNormalXYZ(vN.getX(), vN.getY(), vN.getZ());
    }
}