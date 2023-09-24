import BlenderVertexArray from "./BlenderVertexArray.js";

export default class BlenderVertexArrayTriangles extends BlenderVertexArray {

    constructor() {
        super();
        this.setNumberOfFloat32PerVertex(10);
        this.setPositionOffset(0);
        this.setColorOffset(4 * 4);
        this.setUvOffset(4 * 8);

        this.setVertexCount(0);
        this.setVertexArray(new Float32Array([]));
    }

    addGeometryTriangle(geometryTriangle) {

        var numberOfVertices = 3;
        var numberOfFloat32PerVertex = this.getNumberOfFloat32PerVertex();
        var newVertexArraySize = this.getVertexArray().length + (numberOfVertices * numberOfFloat32PerVertex);

        var newVertexArray = new Float32Array(newVertexArraySize);

        for (var i = 0; i < this.getVertexArray().length; i++) {
            newVertexArray[i] = this.getVertexArray()[i];
        }

        var j = this.getVertexArray().length;

        newVertexArray[j] = geometryTriangle.getData().getVertexA().getX();
        newVertexArray[j + 1] = geometryTriangle.getData().getVertexA().getY();
        newVertexArray[j + 2] = geometryTriangle.getData().getVertexA().getZ();
        newVertexArray[j + 3] = 1;
        newVertexArray[j + 4] = geometryTriangle.getColor().getRed();
        newVertexArray[j + 5] = geometryTriangle.getColor().getGreen();
        newVertexArray[j + 6] = geometryTriangle.getColor().getBlue();
        newVertexArray[j + 7] = geometryTriangle.getColor().getAlpha();
        newVertexArray[j + 8] = geometryTriangle.getData().getVertexA().getU();
        newVertexArray[j + 9] = geometryTriangle.getData().getVertexA().getV();

        newVertexArray[j + 10] = geometryTriangle.getData().getVertexB().getX();
        newVertexArray[j + 11] = geometryTriangle.getData().getVertexB().getY();
        newVertexArray[j + 12] = geometryTriangle.getData().getVertexB().getZ();
        newVertexArray[j + 13] = 1;
        newVertexArray[j + 14] = geometryTriangle.getColor().getRed();
        newVertexArray[j + 15] = geometryTriangle.getColor().getGreen();
        newVertexArray[j + 16] = geometryTriangle.getColor().getBlue();
        newVertexArray[j + 17] = geometryTriangle.getColor().getAlpha();
        newVertexArray[j + 18] = geometryTriangle.getData().getVertexB().getU();
        newVertexArray[j + 19] = geometryTriangle.getData().getVertexB().getV();
        
        newVertexArray[j + 20] = geometryTriangle.getData().getVertexC().getX();
        newVertexArray[j + 21] = geometryTriangle.getData().getVertexC().getY();
        newVertexArray[j + 22] = geometryTriangle.getData().getVertexC().getZ();
        newVertexArray[j + 23] = 1;
        newVertexArray[j + 24] = geometryTriangle.getColor().getRed();
        newVertexArray[j + 25] = geometryTriangle.getColor().getGreen();
        newVertexArray[j + 26] = geometryTriangle.getColor().getBlue();
        newVertexArray[j + 27] = geometryTriangle.getColor().getAlpha();
        newVertexArray[j + 28] = geometryTriangle.getData().getVertexC().getU();
        newVertexArray[j + 29] = geometryTriangle.getData().getVertexC().getV();

        this.setVertexArray(newVertexArray);

        this.setVertexCount(this.getVertexCount() + numberOfVertices);
    }
}