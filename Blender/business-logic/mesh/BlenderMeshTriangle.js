import BlenderMesh from "./BlenderMesh.js";

export default class BlenderMeshTriangle extends BlenderMesh {


    constructor() {
        super();
        this.setVertexSize(4 * 8);
        this.setPositionOffset(0);
        this.setColorOffset(null);
        this.setUvOffset(null);
        this.setVertexCount(3);

        // Each vertex has a position and a color packed in memory in X Y Z W R G B A order
        this.setVertexArray(new Float32Array([
            -1.0, -1.0, 0, 1, 1, 0, 0, 1, -0.0, 1.0, 0, 1, 0, 1, 0, 1, 1.0, -1.0,
            0, 1, 0, 0, 1, 1,
          ]));
    }

}