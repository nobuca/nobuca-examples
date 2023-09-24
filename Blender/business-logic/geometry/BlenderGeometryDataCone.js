import BlenderGeometryData from "./BlenderGeometryData.js";
import BlenderGeometry from "./BlenderGeometry.js";
import BlenderGeometryVertex from "./BlenderGeometryVertex.js";

export default class BlenderGeometryDataCone extends BlenderGeometryData {

    constructor() {
        super();
        this.height = 2;
        this.segments = 16;
        this.radius = 1;
    }

    getHeight() {
        return this.height;
    }

    getSegments() {
        return this.segments;
    }

    getRadius() {
        return this.radius;
    }

    createGeometryTriangles() {

        var vA = (new BlenderGeometryVertex()).setXYZ(0, 0, this.getHeight() / 2);

        var opacity = .3;

        var x1 = this.getRadius();
        var y1 = 0;

        var increment = (2 * Math.PI) / this.getSegments();
        var max = (increment * this.getSegments()) + 1
        for (var radians = 0; radians <= max; radians += increment) {

            var vB = (new BlenderGeometryVertex()).setXYZ(x1, y1, -this.getHeight() / 2);

            var x2 = Math.cos(radians) * this.getRadius();
            var y2 = Math.sin(radians) * this.getRadius();
    
            var vC = (new BlenderGeometryVertex()).setXYZ(x2, y2, -this.getHeight() / 2);
    
            var triangle = new BlenderGeometry("triangle");
            triangle.getData().getVertexA().setXYZ(vA.getX(), vA.getY(), vA.getZ()).setUV(1, 1);
            triangle.getData().getVertexB().setXYZ(vB.getX(), vB.getY(), vB.getZ()).setUV(1, 1);
            triangle.getData().getVertexC().setXYZ(vC.getX(), vC.getY(), vC.getZ()).setUV(1, 0);
            triangle.getColor().setRedGreenBlueAlpha(.75, .75, .75, opacity);
            this.addGeometryTriangle(triangle);

            x1 = x2;
            y1 = y2;
        }

        var triangle = new BlenderGeometry("triangle");
        triangle.getData().getVertexA().setXYZ(vA.getX(), vA.getY(), vA.getZ()).setUV(1, 1);
        triangle.getData().getVertexB().setXYZ(vB.getX(), vB.getY(), vB.getZ()).setUV(1, 1);
        triangle.getData().getVertexC().setXYZ(vC.getX(), vC.getY(), vC.getZ()).setUV(1, 0);
        triangle.getColor().setRedGreenBlueAlpha(.75, .75, .75, opacity);
        this.addGeometryTriangle(triangle);
    }
}