import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js"
import BlenderMeshCube from "../../../business-logic/mesh/BlenderMeshCube.js";
import BlenderMeshTriangle from "../../../business-logic/mesh/BlenderMeshTriangle.js";

export default class BlenderControl3DViewportModel extends NobucaComponentModel {

    constructor() {
        super();
        this.createMesh();
    }

    getClassName() {
        return "BlenderControl3DViewportModel";
    }

    createMesh() {
        //this.mesh = new BlenderMeshTriangle();
        this.mesh = new BlenderMeshCube();
    }

    getMesh() {
        return this.mesh;
    }
}