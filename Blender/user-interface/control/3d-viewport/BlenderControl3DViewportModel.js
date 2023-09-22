import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js"
import BlenderCameraArcball from "../../../business-logic/camera/BlenderCameraArcball.js";
import BlenderGeometry from "../../../business-logic/geometry/BlenderGeometry.js";
import BlenderVertexArrayTriangles from "./vertex-array/BlenderVertexArrayTriangles.js";

export default class BlenderControl3DViewportModel extends NobucaComponentModel {

    constructor() {
        super();
        this.createCamera();
        this.createGeometryLinesAndTriangles()
    }

    getClassName() {
        return "BlenderControl3DViewportModel";
    }

    createCamera() {
        //this.camera = new BlenderCameraRotating();
        this.camera = new BlenderCameraArcball();
    }

    getCamera() {
        return this.camera;
    }

    createGeometryLinesAndTriangles() {
        this.createGeometryLines();
        this.createGeometryTriangles();
    }
    getGeometryTriangles() {
        return this.geometryTriangles;
    }

    addGeometryTriangle(geometryTriangle) {
        this.getGeometryTriangles().push(geometryTriangle);
    }

    createGeometryLines() {
        this.geometryLines = [];
        this.createLinesAxisX();
        this.createLinesAxisY();
        this.createLinesAxisZ();
        this.createLinesGrid();
    }

    getGeometryLines() {
        return this.geometryLines;
    }

    addGeometryLine(geometryLine) {
        this.getGeometryLines().push(geometryLine);
    }

    getAxisMaxDistance() {
        return 1000;
    }

    getGridSize() {
        return 1;
    }

    createLinesAxisX() {
        var axis = new BlenderGeometry("line");
        axis.getData().getVertexA().setXYZ(-1 * this.getAxisMaxDistance(), 0, 0);;
        axis.getData().getVertexB().setXYZ(this.getAxisMaxDistance(), 0, 0);
        axis.getColor().setRedGreenBlue(.5, .0, .0, 1);
        this.addGeometryLine(axis);
    }

    createLinesAxisY() {
        var axis = new BlenderGeometry("line");
        axis.getData().getVertexA().setXYZ(0, -1 * this.getAxisMaxDistance(), 0);
        axis.getData().getVertexB().setXYZ(0, this.getAxisMaxDistance(), 0);
        axis.getColor().setRedGreenBlue(.0, .5, .0, 1);
        this.addGeometryLine(axis);
    }

    createLinesAxisZ() {
        var axis = new BlenderGeometry("line");
        axis.getData().getVertexA().setXYZ(0, 0, -1 * this.getAxisMaxDistance());
        axis.getData().getVertexB().setXYZ(0, 0, this.getAxisMaxDistance());
        axis.getColor().setRedGreenBlue(.0, .0, .5, 1);
        this.addGeometryLine(axis);
    }

    createLinesGrid() {
        for (var x = -this.getAxisMaxDistance(); x < this.getAxisMaxDistance(); x += this.getGridSize()) {
            var gridLine = new BlenderGeometry("line");
            gridLine.getData().getVertexA().setXYZ(x, 0, -this.getAxisMaxDistance());
            gridLine.getData().getVertexB().setXYZ(x, 0, this.getAxisMaxDistance());
            gridLine.getColor().setRedGreenBlue(.5, .5, .5, 1);
            this.addGeometryLine(gridLine);
        }
        for (var y = -this.getAxisMaxDistance(); y < this.getAxisMaxDistance(); y += this.getGridSize()) {
            var gridLine = new BlenderGeometry("line");
            gridLine.getData().getVertexA().setXYZ(-1 * this.getAxisMaxDistance(), 0, y);
            gridLine.getData().getVertexB().setXYZ(this.getAxisMaxDistance(), 0, y);
            gridLine.getColor().setRedGreenBlue(.5, .5, .5, 1);
            this.addGeometryLine(gridLine);
        }
    }

    createGeometryTriangles() {
        this.geometryTriangles = [];

        var triangle1 = new BlenderGeometry("triangle");
        triangle1.getData().getVertexA().setXYZ(1, -1, 1).setUV(0, 1);
        triangle1.getData().getVertexB().setXYZ(-1, -1, 1).setUV(1, 1);
        triangle1.getData().getVertexC().setXYZ(-1, -1, -1).setUV(1, 0);
        triangle1.getColor().setRedGreenBlue(1, 1, 1, 1);
        this.addGeometryTriangle(triangle1);

        var triangle2 = new BlenderGeometry("triangle");
        triangle2.getData().getVertexA().setXYZ(1, -1, -1).setUV(0, 0);
        triangle2.getData().getVertexB().setXYZ(1, -1, 1).setUV(0, 1);
        triangle2.getData().getVertexC().setXYZ(-1, -1, -1).setUV(1, 0);
        triangle2.getColor().setRedGreenBlue(1, 1, 1, 1);
        this.addGeometryTriangle(triangle2);

        var triangle3 = new BlenderGeometry("triangle");
        triangle3.getData().getVertexA().setXYZ(1, 1, 1).setUV(0, 1);
        triangle3.getData().getVertexB().setXYZ(1, -1, 1).setUV(1, 1);
        triangle3.getData().getVertexC().setXYZ( 1, -1, -1).setUV(1, 0);
        triangle3.getColor().setRedGreenBlue(1, 1, 1, 1);
        this.addGeometryTriangle(triangle3);

        var triangle4 = new BlenderGeometry("triangle");
        triangle4.getData().getVertexA().setXYZ(1, 1, -1).setUV(0, 0);
        triangle4.getData().getVertexB().setXYZ(1, 1, 1).setUV(0, 1);
        triangle4.getData().getVertexC().setXYZ(1, -1, -1).setUV(1, 0);
        triangle4.getColor().setRedGreenBlue(1, 1, 1, 1);
        this.addGeometryTriangle(triangle4);
    }


}