import NobucaAppView from "../../nobuca-core/app/NobucaAppView.js";
import NobucaFactory from "../../nobuca-core/factory/NobucaFactory.js";
import EclipseWindowView from "./window/EclipseWindowView.js";

export default class EclipseAppView extends NobucaAppView {

    constructor(model) {
        super(model);
        this.createWindow();
    }

    registerCustomViewConstructors() {
        this.registerViewConstructorForModelClassName("EclipseWindowModel",
            function (model) { return new EclipseWindowView(model); });
    }

    getClassName() {
        return "EclipseApp";
    }

    createWindow() {
        this.windowView = NobucaFactory.createNewViewForModel(this.getModel().getWindow());
        this.getNativeElement().appendChild(this.getWindowView().getNativeElement());
        this.updateContentsPositionAndSize();
    }

    getWindowView() {
        return this.windowView;
    }

    updateContentsPositionAndSize() {
        this.getNativeElement().style.height = window.innerHeight + "px";
        this.getNativeElement().style.width = window.innerWidth + "px";
        if (this.getWindowView() == null) return;
        this.getWindowView().getNativeElement().style.height = window.innerHeight + "px";
        this.getWindowView().getNativeElement().style.width = window.innerWidth + "px";
        this.getWindowView().updateContentsPositionAndSize();
    }
}