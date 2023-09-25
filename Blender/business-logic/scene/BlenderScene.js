import BlenderGeometry from "../geometry/BlenderGeometry.js";
import BlenderSceneObject from "./BlenderSceneObject.js";


export default class BlenderScene {

    constructor() {
        this.objects = [];

        var sceneObject = this.addObject("Cube", "geometry", new BlenderGeometry("cube"));
        sceneObject.getTransform().translate(9, 0, 0);

        var sceneObject2 = this.addObject("Cube 2", "geometry", new BlenderGeometry("cube"));
        sceneObject2.getTransform().translate(4, 0, 0);

        var sceneObject3 = this.addObject("Cone", "geometry", new BlenderGeometry("cone"));
        sceneObject3.getTransform().translate(-2, 0, 0);
    }

    getObjects() {
        return this.objects;
    }

    addObject(name, type, data) {
        var object = new BlenderSceneObject(name, type, data);
        this.getObjects().push(object);
        return object;
    }
}