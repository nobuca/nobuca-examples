import BlenderGeometryDataCube from "./BlenderGeometryDataCube.js";
import BlenderGeometryDataLine from "./BlenderGeometryDataLine.js";
import BlenderGeometryMaterial from "./BlenderGeometryMaterial.js";
import BlenderGeometryColor from "./BlenderGeometryColor.js"
import BlenderGeometryDataTriangle from "./BlenderGeometryDataTriangle.js";
import BlenderGeometryDataCone from "./BlenderGeometryDataCone.js";

export default class BlenderGeometry {

    constructor(type) {
        this.setType(type);
        this.color = new BlenderGeometryColor();
        this.material = new BlenderGeometryMaterial();
    }

    getType() {
        return this.type;
    }

    setType(type) {
        
        if (type == this.getType()) return;
        this.type = type;

        if (type == "line") this.data = new BlenderGeometryDataLine();
        else if (type == "triangle") this.data = new BlenderGeometryDataTriangle();
        else if (type == "cube") this.data = new BlenderGeometryDataCube();
        else if (type == "cone") this.data = new BlenderGeometryDataCone();
        else throw "Type " + type + " is not a valid geometry data type";
        
        this.getData().createGeometryTriangles();

        return this;
    }

    getData() {
        return this.data;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    getColor() {
        return this.color;
    }

    setMaterial(material) {
        this.material = material;
        return this;
    }

    getMaterial() {
        return this.material;
    }

    getGeometryTriangles() {
        return this.getData().getGeometryTriangles();
    }
}