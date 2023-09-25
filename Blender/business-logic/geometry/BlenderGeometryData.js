
import BlenderGeometry from "./BlenderGeometry.js";

export default class BlenderGeometryData {

    constructor() {
        this.geometryTriangles = [];
        this.geometryLines = [];
    }

    createGeometryLinesAndTriangles() {
    }

    createGeometryLines() {
    }

    getGeometryTriangles() {
        return this.geometryTriangles;
    }

    addGeometryTriangle(geometryTriangle) {
        this.getGeometryTriangles().push(geometryTriangle);
    }

    getGeometryLines() {
        return this.geometryLines;
    }

    addGeometryLine(geometryLine) {
        this.getGeometryLines().push(geometryLine);
    }

    createWireframeLines() {

        var opacity = .3;

        this.getGeometryTriangles().forEach(geometryTriangle => {

            var line1 = new BlenderGeometry("line");
            line1.getData().getVertexA().setXYZ(
                geometryTriangle.getData().getVertexA().getX(),
                geometryTriangle.getData().getVertexA().getY(),
                geometryTriangle.getData().getVertexA().getZ());
            line1.getData().getVertexB().setXYZ(
                geometryTriangle.getData().getVertexB().getX(),
                geometryTriangle.getData().getVertexB().getY(),
                geometryTriangle.getData().getVertexB().getZ());
            line1.getColor().setRedGreenBlueAlpha(0, 0, 0, opacity);
            this.addGeometryLine(line1);

            var line2 = new BlenderGeometry("line");
            line2.getData().getVertexA().setXYZ(
                geometryTriangle.getData().getVertexB().getX(),
                geometryTriangle.getData().getVertexB().getY(),
                geometryTriangle.getData().getVertexB().getZ());
            line2.getData().getVertexB().setXYZ(
                geometryTriangle.getData().getVertexC().getX(),
                geometryTriangle.getData().getVertexC().getY(),
                geometryTriangle.getData().getVertexC().getZ());
            line2.getColor().setRedGreenBlueAlpha(0, 0, 0, opacity);
            this.addGeometryLine(line2);

            var line3 = new BlenderGeometry("line");
            line3.getData().getVertexA().setXYZ(
                geometryTriangle.getData().getVertexC().getX(),
                geometryTriangle.getData().getVertexC().getY(),
                geometryTriangle.getData().getVertexC().getZ());
            line3.getData().getVertexB().setXYZ(
                geometryTriangle.getData().getVertexA().getX(),
                geometryTriangle.getData().getVertexA().getY(),
                geometryTriangle.getData().getVertexA().getZ());
            line3.getColor().setRedGreenBlueAlpha(0, 0, 0, opacity);
            this.addGeometryLine(line3);

            var normal1 = new BlenderGeometry("line");
            normal1.getData().getVertexA().setXYZ(
                geometryTriangle.getData().getVertexA().getX(),
                geometryTriangle.getData().getVertexA().getY(),
                geometryTriangle.getData().getVertexA().getZ());
            normal1.getData().getVertexB().setXYZ(
                geometryTriangle.getData().getVertexA().getX() + geometryTriangle.getData().getVertexA().getNx(),
                geometryTriangle.getData().getVertexA().getY() + geometryTriangle.getData().getVertexA().getNy(),
                geometryTriangle.getData().getVertexA().getZ() + geometryTriangle.getData().getVertexA().getNz());
            normal1.getColor().setRedGreenBlueAlpha(1, 1, 0, opacity);
            this.addGeometryLine(normal1);

            var normal2 = new BlenderGeometry("line");
            normal2.getData().getVertexA().setXYZ(
                geometryTriangle.getData().getVertexB().getX(),
                geometryTriangle.getData().getVertexB().getY(),
                geometryTriangle.getData().getVertexB().getZ());
            normal2.getData().getVertexB().setXYZ(
                geometryTriangle.getData().getVertexB().getX() + geometryTriangle.getData().getVertexB().getNx(),
                geometryTriangle.getData().getVertexB().getY() + geometryTriangle.getData().getVertexB().getNy(),
                geometryTriangle.getData().getVertexB().getZ() + geometryTriangle.getData().getVertexB().getNz());
            normal2.getColor().setRedGreenBlueAlpha(1, 1, 0, opacity);
            this.addGeometryLine(normal2);

            var normal3 = new BlenderGeometry("line");
            normal3.getData().getVertexA().setXYZ(
                geometryTriangle.getData().getVertexC().getX(),
                geometryTriangle.getData().getVertexC().getY(),
                geometryTriangle.getData().getVertexC().getZ());
                normal3.getData().getVertexB().setXYZ(
                geometryTriangle.getData().getVertexC().getX() + geometryTriangle.getData().getVertexC().getNx(),
                geometryTriangle.getData().getVertexC().getY() + geometryTriangle.getData().getVertexC().getNy(),
                geometryTriangle.getData().getVertexC().getZ() + geometryTriangle.getData().getVertexC().getNz());
                normal3.getColor().setRedGreenBlueAlpha(1, 1, 0, opacity);
            this.addGeometryLine(normal3);
        });

    }
}