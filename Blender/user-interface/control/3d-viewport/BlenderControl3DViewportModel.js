import NobucaComponentModel from "../../../../../nobuca-core/component/NobucaComponentModel.js"
import BlenderCameraArcball from "../../../business-logic/camera/BlenderCameraArcball.js";
import BlenderFileCurrent from "../../../business-logic/file/BlenderFileCurrent.js";
import BlenderGeometry from "../../../business-logic/geometry/BlenderGeometry.js";
import BlenderGeometryColor from "../../../business-logic/geometry/BlenderGeometryColor.js";
import BlenderGeometryDataTriangle from "../../../business-logic/geometry/BlenderGeometryDataTriangle.js";

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
            if (y % 10) gridLine.setColor(color1);
            else gridLine.setColor(color2);
            this.addGeometryLine(gridLine);
        }
        for (var x = -this.getAxisMaxDistance(); x < this.getAxisMaxDistance(); x += this.getGridSize()) {
            var gridLine = new BlenderGeometry("line");
            gridLine.getData().getVertexA().setXYZ(x, -this.getAxisMaxDistance(), 0);
            gridLine.getData().getVertexB().setXYZ(x, this.getAxisMaxDistance(), 0);
            if (x % 10) gridLine.setColor(color1);
            else gridLine.setColor(color2);
            this.addGeometryLine(gridLine);
        }
    }

    createGeometryTriangles() {

        this.geometryTriangles = [];

        var scene = BlenderFileCurrent.getFile().getContents().getActiveScene();
        scene.getObjects().forEach(sceneObject => {
            if (sceneObject.getType() == "geometry") {
                var geometryTriangles = sceneObject.getData().getGeometryTriangles();
                geometryTriangles.forEach(geometryTriangle => {
                    var geometryTriangleTranformed = this.applyTranformation(geometryTriangle, sceneObject.getTransform());
                    this.addGeometryTriangle(geometryTriangleTranformed)
                });
            }
        });
    }

    applyTranformation(geometryTriangle, sceneObjectTransform) {
        var geometryTriangleTranformed = new BlenderGeometry("triangle");
        geometryTriangleTranformed.setColor(geometryTriangle.getColor());
        geometryTriangleTranformed.setMaterial(geometryTriangle.getMaterial());
        var vertexA = geometryTriangle.getData().getVertexA();
        var vertexB = geometryTriangle.getData().getVertexB();
        var vertexC = geometryTriangle.getData().getVertexC();
        var vertexATranformed = sceneObjectTransform.createTransformedVertex(vertexA);
        var vertexBTranformed = sceneObjectTransform.createTransformedVertex(vertexB);
        var vertexCTranformed = sceneObjectTransform.createTransformedVertex(vertexC);
        geometryTriangleTranformed.getData().setVertexA(vertexATranformed);
        geometryTriangleTranformed.getData().setVertexB(vertexBTranformed);
        geometryTriangleTranformed.getData().setVertexC(vertexCTranformed);
        return geometryTriangleTranformed;
    }
}