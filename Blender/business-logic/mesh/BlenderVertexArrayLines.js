import BlenderVertexArray from "./BlenderVertexArray.js";

export default class BlenderVertexArrayLines extends BlenderVertexArray {


    constructor() {
        super();
        this.setVertexSize(4 * 8);
        this.setPositionOffset(0);
        this.setColorOffset(4 * 4);
        this.setVertexCount(0);

        // Each vertex has a position and a color packed in memory in X Y Z W R G B A order
        this.setVertexArray(new Float32Array([]));
    }

    addLine(line) {

        var newVertexArray = new Float32Array(this.getVertexArray().length + (2 * 8));

        for (var i = 0; i < this.getVertexArray().length; i++) {
            newVertexArray[i] = this.getVertexArray()[i];
        }

        var j = this.getVertexArray().length;
        newVertexArray[j] = line.getPointA().getX();
        newVertexArray[j + 1] = line.getPointA().getY();
        newVertexArray[j + 2] = line.getPointA().getZ();
        newVertexArray[j + 3] = 1;
        newVertexArray[j + 4] = line.getColor().getRed();
        newVertexArray[j + 5] = line.getColor().getGreen();
        newVertexArray[j + 6] = line.getColor().getBlue();
        newVertexArray[j + 7] = 1;
        newVertexArray[j + 8] = line.getPointB().getX();
        newVertexArray[j + 9] = line.getPointB().getY();
        newVertexArray[j + 10] = line.getPointB().getZ();
        newVertexArray[j + 11] = 1;
        newVertexArray[j + 12] = line.getColor().getRed();
        newVertexArray[j + 13] = line.getColor().getGreen();
        newVertexArray[j + 14] = line.getColor().getBlue();
        newVertexArray[j + 15] = 1;

        this.setVertexArray(newVertexArray);

        this.setVertexCount(this.getVertexCount() + 2);
    }

}