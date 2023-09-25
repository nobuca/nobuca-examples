import BlenderVertexArray from "./BlenderVertexArray.js";

export default class BlenderVertexArrayTriangles extends BlenderVertexArray {

    constructor() {
        super();
        this.setNumberOfFloat32PerVertex(14);
        this.setPositionOffset(0);
        this.setColorOffset(4 * 4);
        this.setUvOffset(4 * 8);
        this.setNormalOffset(4 * 10);

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
        newVertexArray[j + 10] = geometryTriangle.getData().getVertexA().getNx();
        newVertexArray[j + 11] = geometryTriangle.getData().getVertexA().getNy();
        newVertexArray[j + 12] = geometryTriangle.getData().getVertexA().getNz();
        newVertexArray[j + 13] = 1;

        newVertexArray[j + 14] = geometryTriangle.getData().getVertexB().getX();
        newVertexArray[j + 15] = geometryTriangle.getData().getVertexB().getY();
        newVertexArray[j + 16] = geometryTriangle.getData().getVertexB().getZ();
        newVertexArray[j + 17] = 1;
        newVertexArray[j + 18] = geometryTriangle.getColor().getRed();
        newVertexArray[j + 19] = geometryTriangle.getColor().getGreen();
        newVertexArray[j + 20] = geometryTriangle.getColor().getBlue();
        newVertexArray[j + 21] = geometryTriangle.getColor().getAlpha();
        newVertexArray[j + 22] = geometryTriangle.getData().getVertexB().getU();
        newVertexArray[j + 23] = geometryTriangle.getData().getVertexB().getV();
        newVertexArray[j + 24] = geometryTriangle.getData().getVertexB().getNx();
        newVertexArray[j + 25] = geometryTriangle.getData().getVertexB().getNy();
        newVertexArray[j + 26] = geometryTriangle.getData().getVertexB().getNz();
        newVertexArray[j + 27] = 1;

        newVertexArray[j + 28] = geometryTriangle.getData().getVertexC().getX();
        newVertexArray[j + 29] = geometryTriangle.getData().getVertexC().getY();
        newVertexArray[j + 30] = geometryTriangle.getData().getVertexC().getZ();
        newVertexArray[j + 31] = 1;
        newVertexArray[j + 32] = geometryTriangle.getColor().getRed();
        newVertexArray[j + 33] = geometryTriangle.getColor().getGreen();
        newVertexArray[j + 34] = geometryTriangle.getColor().getBlue();
        newVertexArray[j + 35] = geometryTriangle.getColor().getAlpha();
        newVertexArray[j + 36] = geometryTriangle.getData().getVertexC().getU();
        newVertexArray[j + 37] = geometryTriangle.getData().getVertexC().getV();
        newVertexArray[j + 38] = geometryTriangle.getData().getVertexC().getNx();
        newVertexArray[j + 39] = geometryTriangle.getData().getVertexC().getNy();
        newVertexArray[j + 40] = geometryTriangle.getData().getVertexC().getNz();
        newVertexArray[j + 41] = 1;

        this.setVertexArray(newVertexArray);

        this.setVertexCount(this.getVertexCount() + numberOfVertices);
    }
}