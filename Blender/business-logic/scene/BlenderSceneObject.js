
import BlenderSceneObjectTransform from "./BlenderSceneObjectTransform.js";

export default class BlenderSceneObject {

     constructor(name, type, data) {
        this.name = name;
        this.type = type;
        this.data = data;
        this.transform = new BlenderSceneObjectTransform();
        this.objects = [];
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }

    getData() {
        return this.data;
    }

    getTransform() {
        return this.transform;
    }

    getObjects() {
        return this.objects;
    }

    addObject(type, data) {
        var object = new BlenderSceneObject(type, data);
        this.getObjects().push(object);
        return object;
    }

}