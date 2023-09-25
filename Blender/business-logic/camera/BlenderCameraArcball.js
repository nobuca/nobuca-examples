import BlenderMatrix4 from "../math/BlenderMatrix4.js";
import BlenderVector3 from "../math/BlenderVector3.js";
import BlenderCamera from "./BlenderCamera.js";

export default class BlenderCameraArcball extends BlenderCamera {

    constructor() {
        super();
        this.axisY = (new BlenderVector3()).setXYZ(0, 0, 1);
        this.getPosition().setXYZ(12, 12, 12);
        this.getBack().copyFrom(this.getPosition()).normalize();
        this.getUp().setXYZ(0, 0, 1);
        this.recalcuateRightAndUp();
    }

    update(deltaTime, mouseState) {

        if (mouseState.shiftKey) {
            this.getMatrix().translate(-mouseState.x * 0.01, mouseState.y * 0.01, 0);
            //this.getBack().copyFrom(this.getPosition()).normalize();
            //this.recalcuateRightAndUp();
            this.getViewMatrix().copyFrom(this.getMatrix()).invert();
            return;
        } else {
            this.getMatrix().translate(-mouseState.x * 0.01, mouseState.y * 0.01, 0);
            this.getBack().copyFrom(this.getPosition()).normalize();
            this.recalcuateRightAndUp();
            this.getViewMatrix().copyFrom(this.getMatrix()).invert();
            return;
        }

    }

    recalcuateRightAndUp() {
        this.getRight().cross(this.axisY, this.getBack()).normalize();
        this.getUp().cross(this.getBack(), this.getRight()).normalize();
    }
}