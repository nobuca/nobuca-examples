import BlenderMatrix4 from "../math/BlenderMatrix4.js";
import BlenderVector3 from "../math/BlenderVector3.js";
import BlenderCamera from "./BlenderCamera.js";

export default class BlenderCameraArcball extends BlenderCamera {

    constructor() {
        super();
        this.axisY = new BlenderVector3();
        this.axisY.setXYZ(0, 0, 1);
        this.getPosition().setXYZ(12, 12, 12);
        this.worldArcballPosition = (new BlenderVector3()).setXYZ(0, 0, 0);
        this.relativeArcballPosition = (new BlenderVector3()).copyFrom(this.getPosition());
        this.distance = this.relativeArcballPosition.length();
        this.angularVelocity = 0;
        this.axis = new BlenderVector3();
        this.rotationSpeed = 1;
        this.zoomSpeed = 0.1;
        this.frictionCoefficient = 0;
        this.getBack().copyFrom(this.relativeArcballPosition).normalize();
        this.recalcuateRightAndUp();
        this.movement = new BlenderVector3();
        this.crossProduct = new BlenderVector3();
        this.rotationMatrix = new BlenderMatrix4();
        this.epsilon = 0.0000001;
        this.lastMx = 0.0;
        this.lastMy = 0.0;
    }

    update(deltaTime, mouseState) {

        if (mouseState.shiftKey) {

            this.worldArcballPosition.addScaled(this.getRight(), (-mouseState.movementX) * 0.01);
            this.worldArcballPosition.addScaled(this.getUp(), (mouseState.movementY) * 0.01);
            
            this.getPosition().setXYZ(
                this.worldArcballPosition.getX() + this.relativeArcballPosition.getX(),
                this.worldArcballPosition.getY() + this.relativeArcballPosition.getY(),
                this.worldArcballPosition.getZ() + this.relativeArcballPosition.getZ());
    
            // Invert the camera matrix to build the view matrix
            this.getViewMatrix().copyFrom(this.getMatrix()).invert();

            return;
        }

        this.movement.setXYZ(0, 0, 0);
        this.movement.addScaled(this.getRight(), (mouseState.movementX) * 0.1);
        this.movement.addScaled(this.getUp(), (-mouseState.movementY) * 0.1);

        if (mouseState.wheelButtonDown) {
            // Currently being dragged.
            this.angularVelocity = 0;
        } else {
            // Dampen any existing angular velocity
            this.angularVelocity *= Math.pow(this.frictionCoefficient, deltaTime);
        }

        this.crossProduct.cross(this.movement, this.getBack());

        const magnitude = this.crossProduct.length();

        if (magnitude > this.epsilon) {

            // Normalize the crossProduct to get the rotation axis
            this.crossProduct.scale(1 / magnitude)
            this.axis.copyFrom(this.crossProduct);

            // Remember the current angular velocity. This is used when the touch is released for a fling.
            this.angularVelocity = magnitude * this.rotationSpeed;
        }

        // The rotation around this.axis to apply to the camera matrix this update
        const rotationAngle = this.angularVelocity * deltaTime;
        if (Math.abs(rotationAngle) > this.epsilon) {

            // Rotate the matrix around axis
            // Note: The rotation is not done as a matrix-matrix multiply as the repeated multiplications
            // will quickly introduce substantial error into the matrix.

            this.rotationMatrix.rotation(this.axis, rotationAngle);

            this.getBack().transformMat4Upper3x3(this.rotationMatrix).normalize();

            this.recalcuateRightAndUp();
        }

        // recalculate `this.position` from `this.back` considering zoom
        if (mouseState.wheel !== 0) {
            this.distance *= 1 + mouseState.wheel * this.zoomSpeed;
        }

        this.relativeArcballPosition.copyFrom(this.getBack());
        this.relativeArcballPosition.scale(this.distance);

        this.getPosition().setXYZ(
            this.worldArcballPosition.getX() + this.relativeArcballPosition.getX(),
            this.worldArcballPosition.getY() + this.relativeArcballPosition.getY(),
            this.worldArcballPosition.getZ() + this.relativeArcballPosition.getZ());

        // Invert the camera matrix to build the view matrix
        this.getViewMatrix().copyFrom(this.getMatrix()).invert();
    }

    recalcuateRightAndUp() {
        this.getRight().cross(this.axisY, this.getBack()).normalize();
        this.getUp().cross(this.getBack(), this.getRight()).normalize();
    }
}