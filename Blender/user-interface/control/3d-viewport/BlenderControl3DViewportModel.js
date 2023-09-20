import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js"
import BlenderCameraArcball from "../../../business-logic/camera/BlenderCameraArcball.js";
import BlenderCameraRotating from "../../../business-logic/camera/BlenderCameraRotating.js";
import BlenderMeshCube from "../../../business-logic/mesh/BlenderMeshCube.js";
import BlenderVertexArrayLines from "../../../business-logic/mesh/BlenderVertexArrayLines.js";
import BlenderMeshTriangle from "../../../business-logic/mesh/BlenderMeshTriangle.js";
import BlenderLine from "../../../business-logic/mesh/BlenderLine.js";
import BlenderPoint from "../../../business-logic/mesh/BlenderPoint.js";
import BlenderColor from "../../../business-logic/mesh/BlenderColor.js";

export default class BlenderControl3DViewportModel extends NobucaComponentModel {

    constructor() {
        super();
        this.createCamera();
        this.createTriangles();
        this.createLines();
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

    createTriangles() {
        //this.mesh = new BlenderMeshTriangle();
        this.triangles = new BlenderMeshCube();
    }

    getTriangles() {
        return this.triangles;
    }

    createLines() {
        this.lines = new BlenderVertexArrayLines();
        this.createLinesAxisX();
        this.createLinesAxisY();
        this.createLinesAxisZ();
        this.createLinesGrid();
    }

    getLines() {
        return this.lines;
    }

    getAxisMaxDistance() {
        return 1000;
    }

    getGridSize() {
        return 1;
    }

    createLinesAxisX() {
        var pointA = new BlenderPoint();
        pointA.setXYZ(-1 * this.getAxisMaxDistance(), 0, 0);
        var pointB = new BlenderPoint();
        pointB.setXYZ(this.getAxisMaxDistance(), 0, 0);
        var color = new BlenderColor();
        color.setRedGreenBlue(.5, .0, .0, 1);
        var axis = new BlenderLine();
        axis.setPointA(pointA);
        axis.setPointB(pointB);
        axis.setColor(color);
        this.getLines().addLine(axis);
    }

    createLinesAxisY() {
        var pointA = new BlenderPoint();
        pointA.setXYZ(0, -1 * this.getAxisMaxDistance(), 0);
        var pointB = new BlenderPoint();
        pointB.setXYZ(0, this.getAxisMaxDistance(), 0);
        var color = new BlenderColor();
        color.setRedGreenBlue(.0, .5, .0, 1);
        var axis = new BlenderLine();
        axis.setPointA(pointA);
        axis.setPointB(pointB);
        axis.setColor(color);
        this.getLines().addLine(axis);
    }

    createLinesAxisZ() {
        var pointA = new BlenderPoint();
        pointA.setXYZ(0, 0, -1 * this.getAxisMaxDistance());
        var pointB = new BlenderPoint();
        pointB.setXYZ(0, 0, this.getAxisMaxDistance());
        var color = new BlenderColor();
        color.setRedGreenBlue(.0, .0, .5, 1);
        var axis = new BlenderLine();
        axis.setPointA(pointA);
        axis.setPointB(pointB);
        axis.setColor(color);
        this.getLines().addLine(axis);
    }


    createLinesGrid() {
        for (var x = -this.getAxisMaxDistance(); x < this.getAxisMaxDistance(); x += this.getGridSize()) {
            var pointA = new BlenderPoint();
            pointA.setXYZ(x, 0, -this.getAxisMaxDistance());
            var pointB = new BlenderPoint();
            pointB.setXYZ(x, 0, this.getAxisMaxDistance());
            var color = new BlenderColor();
            color.setRedGreenBlue(.5, .5, .5, 1);
            var gridLine = new BlenderLine();
            gridLine.setPointA(pointA);
            gridLine.setPointB(pointB);
            gridLine.setColor(color);
            this.getLines().addLine(gridLine);
        }
        for (var y = -this.getAxisMaxDistance(); y < this.getAxisMaxDistance(); y += this.getGridSize()) {
            var pointA = new BlenderPoint();
            pointA.setXYZ(-1 * this.getAxisMaxDistance(), 0, y);
            var pointB = new BlenderPoint();
            pointB.setXYZ(this.getAxisMaxDistance(), 0, y);
            var color = new BlenderColor();
            color.setRedGreenBlue(.5, .5, .5, 1);
            var gridLine = new BlenderLine();
            gridLine.setPointA(pointA);
            gridLine.setPointB(pointB);
            gridLine.setColor(color);
            this.getLines().addLine(gridLine);
        }
    }

}