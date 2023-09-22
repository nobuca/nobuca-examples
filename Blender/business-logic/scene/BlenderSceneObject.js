

export default class BlenderSceneObject {

     constructor(type, data) {
        this.type = type;
        this.data = data;
        this.objects = [];
    }

    getObjects() {
        return this.objects;
    }

    addObject(type, data) {
        var object = new BlenderSceneObject(type, data);
        this.getObjects().push(object);
        return object;
    }

    getType() {
        return this.type;
    }
}