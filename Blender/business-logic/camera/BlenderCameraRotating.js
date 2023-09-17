import BlenderVector3 from "../math/BlenderVector3.js";
import BlenderCamera from "./BlenderCamera.js";

export default class BlenderCameraRotating extends BlenderCamera {

    constructor() {
        super();
    }

    update(deltaTime) {

        this.getViewMatrix().identity();

        this.getViewMatrix().translate((new BlenderVector3()).fromXYZ(0, 0, -4));

        const now = Date.now() / 1000;

        this.getViewMatrix().rotate((new BlenderVector3()).fromXYZ(Math.sin(now), Math.cos(now), 0), 1);
    }

}