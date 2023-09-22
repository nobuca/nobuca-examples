import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";
import BlenderWebGPU from "./BlenderWebGPU.js";
import BlenderVertexArrayLines from "./vertex-array/BlenderVertexArrayLines.js";
import BlenderVertexArrayTriangles from "./vertex-array/BlenderVertexArrayTriangles.js";

export default class BlenderControl3DViewportView extends NobucaComponentView {

    constructor(model) {
        super(model);
        this.vertexArrayLines = new BlenderVertexArrayLines();
        this.vertexArrayTriangles = new BlenderVertexArrayTriangles();
        this.addModelGeometryLinesToViewVertexArrayLines();
        this.addModelGeometryTrianglesToViewVertexArrayTriangles();
        this.webGPU = new BlenderWebGPU();
    }

    getVertexArrayLines() {
        return this.vertexArrayLines;
    }

    getVertexArrayTriangles() {
        return this.vertexArrayTriangles;
    }

    getWebGPU() {
        return this.webGPU;
    }

    addModelGeometryLinesToViewVertexArrayLines() {
        this.getModel().getGeometryLines()
            .forEach(geometryLine => this.getVertexArrayLines().addGeometryLine(geometryLine));
    }

    addModelGeometryTrianglesToViewVertexArrayTriangles() {
        this.getModel().getGeometryTriangles()
            .forEach(geometryTriangle => this.getVertexArrayTriangles().addGeometryTriangle(geometryTriangle));
    }

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderControl3DViewport";
        this.setNativeElement(div);

        if (navigator.gpu == null) {
            this.createWebGpuNotSupported();
        } else {
            this.createCanvas();
        }

        setTimeout(() => {
            this.initializeWebGPU();
        }, 500);
    }

    createCanvas() {
        this.canvas = document.createElement("canvas");
        this.getNativeElement().appendChild(this.canvas);
    }

    createWebGpuNotSupported() {
        var div = document.createElement("div");
        div.className = "BlenderControl3DViewportWebGpuNotSupported";
        div.innerHTML = "WebGPU not supported :-(";
        this.getNativeElement().appendChild(div);
    }

    getCanvas() {
        return this.canvas;
    }

    updateContentsPositionAndSize() {
        if (this.getCanvas() == null) return;
        this.getCanvas().style.width = this.getNativeElement().offsetWidth + "px";
        this.getCanvas().style.height = this.getNativeElement().offsetHeight + "px";
        setTimeout(() => this.initializeWebGPU(), 500);
    }

    async initializeWebGPU() {
        this.getWebGPU().initialize(
            this.getCanvas(),
            this.getModel().getCamera(),
            this.getVertexArrayLines(),
            this.getVertexArrayTriangles());
    }
}
