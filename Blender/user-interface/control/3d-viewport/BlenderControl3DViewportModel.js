import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js"
import BlenderCameraRotating from "../../../business-logic/camera/BlenderCameraRotating.js";
import BlenderMeshCube from "../../../business-logic/mesh/BlenderMeshCube.js";
import BlenderMeshTriangle from "../../../business-logic/mesh/BlenderMeshTriangle.js";

export default class BlenderControl3DViewportModel extends NobucaComponentModel {

    constructor() {
        super();
        this.createCamera();
        this.createMesh();
    }

    getClassName() {
        return "BlenderControl3DViewportModel";
    }

    createCamera() {
        this.camera = new BlenderCameraRotating();
    }

    getCamera() {
        return this.camera;
    }

    createMesh() {
        //this.mesh = new BlenderMeshTriangle();
        this.mesh = new BlenderMeshCube();
    }

    getMesh() {
        return this.mesh;
    }
}