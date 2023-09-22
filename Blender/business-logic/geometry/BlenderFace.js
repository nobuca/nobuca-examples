
export default class BlenderFace {

    constructor() {
        this.points = [];
    }

    addPoint(point) {
        this.getVertexs().push(point);
    }

    getVertexs() {
        return this.points;
    }

    setNormal(normal) {
        this.normal = normal;
    }

    getNormal() {
        return this.normal;
    }

    setMaterial(material) {
        this.material = material;
    }

    getMaterial() {
        return this.material;
    }
}