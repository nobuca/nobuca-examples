import BlenderVertexArray from "./BlenderVertexArray.js";

export default class BlenderVertexArrayLines extends BlenderVertexArray {


    constructor() {
        super();
        this.setNumberOfFloat32PerVertex(8);
        this.setPositionOffset(0);
        this.setColorOffset(4 * 4);
        this.setVertexCount(0);

        // Each vertex has a position and a color packed in memory in X Y Z W R G B A order
        this.setVertexArray(new Float32Array([]));
    }

    addGeometryLine(geometryLine) {

        var numberOfVertices = 2;
        var numberOfFloat32PerVertex = this.getNumberOfFloat32PerVertex();
        var newVertexArraySize = this.getVertexArray().length + (numberOfVertices * numberOfFloat32PerVertex);

        var newVertexArray = new Float32Array(newVertexArraySize);

        for (var i = 0; i < this.getVertexArray().length; i++) {
            newVertexArray[i] = this.getVertexArray()[i];
        }

        var j = this.getVertexArray().length;

        newVertexArray[j] = geometryLine.getData().getVertexA().getX();
        newVertexArray[j + 1] = geometryLine.getData().getVertexA().getY();
        newVertexArray[j + 2] = geometryLine.getData().getVertexA().getZ();
        newVertexArray[j + 3] = 1;
        newVertexArray[j + 4] = geometryLine.getColor().getRed();
        newVertexArray[j + 5] = geometryLine.getColor().getGreen();
        newVertexArray[j + 6] = geometryLine.getColor().getBlue();
        newVertexArray[j + 7] = 1;

        newVertexArray[j + 8] = geometryLine.getData().getVertexB().getX();
        newVertexArray[j + 9] = geometryLine.getData().getVertexB().getY();
        newVertexArray[j + 10] = geometryLine.getData().getVertexB().getZ();
        newVertexArray[j + 11] = 1;
        newVertexArray[j + 12] = geometryLine.getColor().getRed();
        newVertexArray[j + 13] = geometryLine.getColor().getGreen();
        newVertexArray[j + 14] = geometryLine.getColor().getBlue();
        newVertexArray[j + 15] = 1;

        this.setVertexArray(newVertexArray);

        this.setVertexCount(this.getVertexCount() + numberOfVertices);
    }



}