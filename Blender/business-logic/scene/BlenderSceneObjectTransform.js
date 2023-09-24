import BlenderGeometryVertex from "../geometry/BlenderGeometryVertex.js";

export default class BlenderGeometryTransform {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    incrementX(x) {
        this.x += x;
        return this;
    }

    setX(x) {
        this.x = x;
        return this;
    }

    getX() {
        return this.x;
    }

    createTransformedVertex(vertex) {
        var vertexTransformed = new BlenderGeometryVertex();
        vertexTransformed.copyFromVertex(vertex);
        vertexTransformed.incrementX(this.getX());
        return vertexTransformed;
    }

}