import BlenderGeometryVertex from "../geometry/BlenderGeometryVertex.js";
import BlenderMatrix4 from "../math/BlenderMatrix4.js";
import BlenderVector3 from "../math/BlenderVector3.js";

export default class BlenderGeometryTransform {

    constructor() {
        this.matrix = (new BlenderMatrix4()).identity();
        this.normalMatrix = new BlenderMatrix4();
        this.updateNormalMatrix();
    }

    getMatrix() {
        return this.matrix;
    }

    getNormalMatrix() {
        return this.normalMatrix;
    }

    translate(x, y, z) {
        this.matrix.translate(x, y, z);
        this.updateNormalMatrix();
    }

    updateNormalMatrix() {
        this.getNormalMatrix().copyFrom(this.getMatrix()).invert().transpose();
    }

    createTransformedVertex(vertex) {
        var vertexTransformed = new BlenderGeometryVertex();
        vertexTransformed.copyFromVertex(vertex);

        var position = (new BlenderVector3()).setXYZ(vertex.getX(), vertex.getY(), vertex.getZ());
        position.transformMat4(this.getMatrix());
        vertexTransformed.setXYZ(position.getX(), position.getY(), position.getZ());
        
        var normal = (new BlenderVector3()).setXYZ(vertex.getNx(), vertex.getNy(), vertex.getNz());
        normal.transformMat4(this.getNormalMatrix());
        vertexTransformed.setNormalXYZ(normal.getX(), normal.getY(), normal.getZ());

        return vertexTransformed;
    }



}