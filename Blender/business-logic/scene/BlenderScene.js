import BlenderSceneObject from "./BlenderSceneObject";


export default class BlenderScene {

    constructor() {
        this.objects = [];
    }

    getObjects() {
        return this.objects;
    }

    addObject() {
        var object = new BlenderSceneObject();
        this.getObjects().push(object);
        return object;
    }
}