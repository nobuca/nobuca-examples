import BlenderVector3 from "../math/BlenderVector3.js";
import BlenderCamera from "./BlenderCamera.js";

export default class BlenderCameraRotating extends BlenderCamera {

    update(deltaTime) {

        this.viewMatrix.identity();

        this.viewMatrix.translate(BlenderVector3.fromValues(0, 0, -4));

        const now = Date.now() / 1000;

        this.viewMatrix.rotate(BlenderVector3.fromValues(Math.sin(now), Math.cos(now), 0), 1);
    }

}