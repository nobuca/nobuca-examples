import BlenderGeometryDataCube from "./BlenderGeometryDataCube.js";
import BlenderGeometryDataLine from "./BlenderGeometryDataLine.js";
import BlenderGeometryMaterial from "./BlenderGeometryMaterial.js";
import BlenderGeometryTransform from "./BlenderGeometryTransform.js";
import BlenderGeometryColor from "./BlenderGeometryColor.js"
import BlenderGeometryDataTriangle from "./BlenderGeometryDataTriangle.js";

export default class BlenderGeometry {

    constructor(type) {
        this.setType(type);
        this.color = new BlenderGeometryColor();
        this.material = new BlenderGeometryMaterial();
        this.transform = new BlenderGeometryTransform();
    }

    getType() {
        return this.type;
    }

    setType(type) {
        if (type == this.getType()) return;
        else if (type == "line") this.data = new BlenderGeometryDataLine();
        else if (type == "triangle") this.data = new BlenderGeometryDataTriangle();
        else if (type == "cube") this.data = new BlenderGeometryDataCube();
        else throw "Type " + type + " is not a valid geometry data type";
    }

    getData() {
        return this.data;
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    setMaterial(material) {
        this.material = material;
    }

    getMaterial() {
        return this.material;
    }

    addToVertexArrayOfTriangles(vertexArrayOfTriangles) {
        this.getData().addToVertexArrayOfTriangles(vertexArrayOfTriangles);
    }
}