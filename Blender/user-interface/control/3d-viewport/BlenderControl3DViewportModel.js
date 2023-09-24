import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js"
import BlenderCameraArcball from "../../../business-logic/camera/BlenderCameraArcball.js";
import BlenderGeometry from "../../../business-logic/geometry/BlenderGeometry.js";
import BlenderGeometryColor from "../../../business-logic/geometry/BlenderGeometryColor.js";
import BlenderGeometryVertex from "../../../business-logic/geometry/BlenderGeometryVertex.js";

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
        // this.camera = new BlenderCameraRotating();
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
        axis.getColor().setRedGreenBlueAlpha(.58, .24, .29, 1);
        this.addGeometryLine(axis);
    }

    createLinesAxisY() {
        var axis = new BlenderGeometry("line");
        axis.getData().getVertexA().setXYZ(0, -this.getAxisMaxDistance(), 0);
        axis.getData().getVertexB().setXYZ(0, this.getAxisMaxDistance(), 0);
        axis.getColor().setRedGreenBlueAlpha(.38, .53, .15, 1);
        this.addGeometryLine(axis);
    }

    createLinesGrid() {
        var color1 = (new BlenderGeometryColor()).setRedGreenBlueAlpha(.3, .3, .3, .5);
        var color2 = (new BlenderGeometryColor()).setRedGreenBlueAlpha(.4, .4, .4, .5);
        for (var y = -this.getAxisMaxDistance(); y < this.getAxisMaxDistance(); y += this.getGridSize()) {
            var gridLine = new BlenderGeometry("line");
            gridLine.getData().getVertexA().setXYZ(-this.getAxisMaxDistance(), y, 0);
            gridLine.getData().getVertexB().setXYZ(this.getAxisMaxDistance(), y, 0);
            if(y % 10) gridLine.setColor(color1);
            else gridLine.setColor(color2);
            this.addGeometryLine(gridLine);
        }
        for (var x = -this.getAxisMaxDistance(); x < this.getAxisMaxDistance(); x += this.getGridSize()) {
            var gridLine = new BlenderGeometry("line");
            gridLine.getData().getVertexA().setXYZ(x, -this.getAxisMaxDistance(), 0);
            gridLine.getData().getVertexB().setXYZ(x, this.getAxisMaxDistance(), 0);
            if(x % 10) gridLine.setColor(color1);
            else gridLine.setColor(color2);
            this.addGeometryLine(gridLine);
        }
    }

    createGeometryTriangles() {
        this.geometryTriangles = [];

        var width = 1;

        var vA = (new BlenderGeometryVertex()).setXYZ(width, -width, width);
        var vB = (new BlenderGeometryVertex()).setXYZ(-width, -width, width);
        var vC = (new BlenderGeometryVertex()).setXYZ(-width, -width, -width);
        var vD = (new BlenderGeometryVertex()).setXYZ(width, -width, -width);
        var vE = (new BlenderGeometryVertex()).setXYZ(width, width, width);
        var vF = (new BlenderGeometryVertex()).setXYZ(width, width, -width);
        var vG = (new BlenderGeometryVertex()).setXYZ(-width, width, width);
        var vH = (new BlenderGeometryVertex()).setXYZ(-width, width, -width);

        var opacity = .3;

        var triangle1 = new BlenderGeometry("triangle");
        triangle1.getData().getVertexA().setXYZ(vA.getX(), vA.getY(), vA.getZ()).setUV(0, 1);
        triangle1.getData().getVertexB().setXYZ(vB.getX(), vB.getY(), vB.getZ()).setUV(1, 1);
        triangle1.getData().getVertexC().setXYZ(vC.getX(), vC.getY(), vC.getZ()).setUV(1, 0);
        triangle1.getColor().setRedGreenBlueAlpha(.75, .75, .75, opacity);
        this.addGeometryTriangle(triangle1);

        var triangle2 = new BlenderGeometry("triangle");
        triangle2.getData().getVertexA().setXYZ(vD.getX(), vD.getY(), vD.getZ()).setUV(0, 0);
        triangle2.getData().getVertexB().setXYZ(vA.getX(), vA.getY(), vA.getZ()).setUV(0, 1);
        triangle2.getData().getVertexC().setXYZ(vC.getX(), vC.getY(), vC.getZ()).setUV(1, 0);
        triangle2.getColor().setRedGreenBlueAlpha(.75, .75, .75, opacity);
        this.addGeometryTriangle(triangle2);

        var triangle3 = new BlenderGeometry("triangle");
        triangle3.getData().getVertexA().setXYZ(vE.getX(), vE.getY(), vE.getZ()).setUV(0, 1);
        triangle3.getData().getVertexB().setXYZ(vA.getX(), vA.getY(), vA.getZ()).setUV(1, 1);
        triangle3.getData().getVertexC().setXYZ(vD.getX(), vD.getY(), vD.getZ()).setUV(1, 0);
        triangle3.getColor().setRedGreenBlueAlpha(.65, .65, .65, opacity);
        this.addGeometryTriangle(triangle3);

        var triangle4 = new BlenderGeometry("triangle");
        triangle4.getData().getVertexA().setXYZ(vF.getX(), vF.getY(), vF.getZ()).setUV(0, 0);
        triangle4.getData().getVertexB().setXYZ(vE.getX(), vE.getY(), vE.getZ()).setUV(0, 1);
        triangle4.getData().getVertexC().setXYZ(vD.getX(), vD.getY(), vD.getZ()).setUV(1, 0);
        triangle4.getColor().setRedGreenBlueAlpha(.65, .65, .65, opacity);
        this.addGeometryTriangle(triangle4);

        var triangle5 = new BlenderGeometry("triangle");
        triangle5.getData().getVertexA().setXYZ(vG.getX(), vG.getY(), vG.getZ()).setUV(0, 1);
        triangle5.getData().getVertexB().setXYZ(vE.getX(), vE.getY(), vE.getZ()).setUV(1, 1);
        triangle5.getData().getVertexC().setXYZ(vF.getX(), vF.getY(), vF.getZ()).setUV(1, 0);
        triangle5.getColor().setRedGreenBlueAlpha(.55, .55, .55, opacity);
        this.addGeometryTriangle(triangle5);

        var triangle6 = new BlenderGeometry("triangle");
        triangle6.getData().getVertexA().setXYZ(vH.getX(), vH.getY(), vH.getZ()).setUV(0, 0);
        triangle6.getData().getVertexB().setXYZ(vG.getX(), vG.getY(), vG.getZ()).setUV(0, 1);
        triangle6.getData().getVertexC().setXYZ(vF.getX(), vF.getY(), vF.getZ()).setUV(1, 0);
        triangle6.getColor().setRedGreenBlueAlpha(.55, .55, .55, opacity);
        this.addGeometryTriangle(triangle6);

        var triangle7 = new BlenderGeometry("triangle");
        triangle7.getData().getVertexA().setXYZ(vB.getX(), vB.getY(), vB.getZ()).setUV(0, 1);
        triangle7.getData().getVertexB().setXYZ(vG.getX(), vG.getY(), vG.getZ()).setUV(1, 1);
        triangle7.getData().getVertexC().setXYZ(vH.getX(), vH.getY(), vH.getZ()).setUV(1, 0);
        triangle7.getColor().setRedGreenBlueAlpha(.45, .45, .45, opacity);
        this.addGeometryTriangle(triangle7);

        var triangle8 = new BlenderGeometry("triangle");
        triangle8.getData().getVertexA().setXYZ(vC.getX(), vC.getY(), vC.getZ()).setUV(0, 0);
        triangle8.getData().getVertexB().setXYZ(vB.getX(), vB.getY(), vB.getZ()).setUV(0, 1);
        triangle8.getData().getVertexC().setXYZ(vH.getX(), vH.getY(), vH.getZ()).setUV(1, 0);
        triangle8.getColor().setRedGreenBlueAlpha(.45, .45, .45, opacity);
        this.addGeometryTriangle(triangle8);

        var triangle9 = new BlenderGeometry("triangle");
        triangle9.getData().getVertexA().setXYZ(vE.getX(), vE.getY(), vE.getZ()).setUV(0, 1);
        triangle9.getData().getVertexB().setXYZ(vG.getX(), vG.getY(), vG.getZ()).setUV(1, 1);
        triangle9.getData().getVertexC().setXYZ(vB.getX(), vB.getY(), vB.getZ()).setUV(1, 0);
        triangle9.getColor().setRedGreenBlueAlpha(.35, .35, .35, opacity);
        this.addGeometryTriangle(triangle9);

        var triangle10 = new BlenderGeometry("triangle");
        triangle10.getData().getVertexA().setXYZ(vB.getX(), vB.getY(), vB.getZ()).setUV(1, 0);
        triangle10.getData().getVertexB().setXYZ(vA.getX(), vA.getY(), vA.getZ()).setUV(0, 0);
        triangle10.getData().getVertexC().setXYZ(vE.getX(), vE.getY(), vE.getZ()).setUV(0, 1);
        triangle10.getColor().setRedGreenBlueAlpha(.35, .35, .35, opacity);
        this.addGeometryTriangle(triangle10);

        var triangle11 = new BlenderGeometry("triangle");
        triangle11.getData().getVertexA().setXYZ(vD.getX(), vD.getY(), vD.getZ()).setUV(0, 1);
        triangle11.getData().getVertexB().setXYZ(vC.getX(), vC.getY(), vC.getZ()).setUV(1, 1);
        triangle11.getData().getVertexC().setXYZ(vH.getX(), vH.getY(), vH.getZ()).setUV(1, 0);
        triangle11.getColor().setRedGreenBlueAlpha(.85, .85, .85, opacity);
        this.addGeometryTriangle(triangle11);

        var triangle12 = new BlenderGeometry("triangle");
        triangle12.getData().getVertexA().setXYZ(vF.getX(), vF.getY(), vF.getZ()).setUV(0, 0);
        triangle12.getData().getVertexB().setXYZ(vD.getX(), vD.getY(), vD.getZ()).setUV(0, 1);
        triangle12.getData().getVertexC().setXYZ(vH.getX(), vH.getY(), vH.getZ()).setUV(1, 0);
        triangle12.getColor().setRedGreenBlueAlpha(.85, .85, .85, opacity);
        this.addGeometryTriangle(triangle12);
    }
}