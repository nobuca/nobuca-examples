import NobucaComponentView from "../../../../../nobuca-core/component/NobucaComponentView.js";
import BlenderLogger from "../../../business-logic/logger/BlenderLogger.js";

export default class BlenderControl3DViewportView extends NobucaComponentView {

    createNativeElement() {
        var div = document.createElement("div");
        div.className = "BlenderControl3DViewport";
        this.setNativeElement(div);

        this.createCanvas();

        div.addEventListener("click", event => {
            this.initWebGpu();
        });

    }


    createCanvas() {
        this.canvas = document.createElement("canvas");
        this.getNativeElement().appendChild(this.canvas);
    }

    getCanvas() {
        return this.canvas;
    }

    updateContentsPositionAndSize() {
        this.getCanvas().style.width = this.getNativeElement().offsetWidth + "px";
        this.getCanvas().style.height = this.getNativeElement().offsetHeight + "px";
    }


    initWebGpu() {
        console.log(navigator.gpu);
        if (!navigator.gpu) {
            BlenderLogger.warn("WebGPU not supported :-(");
        } else {
            BlenderLogger.info("WebGPU supported :-)");
        }

        const context = this.getCanvas().getContext('webgpu');
        console.log(context);

        const devicePixelRatio = window.devicePixelRatio || 1;
        this.getCanvas().width = this.getCanvas().clientWidth * devicePixelRatio;
        this.getCanvas().height = this.getCanvas().clientHeight * devicePixelRatio;
        const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

    }
}