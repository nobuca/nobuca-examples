import NobucaAppModel from "../../nobuca-core/app/NobucaAppModel.js";
import EclipsePartContainerSashLeftRightModel from "./window/EclipsePartContainerSashLeftRightModel.js";
import EclipsePartContainerSashTopBottomModel from "./window/EclipsePartContainerSashTopBottomModel.js";
import EclipseWindowModel from "./window/EclipseWindowModel.js";
import EclipseWindowPartContainerStackModel from "./window/EclipseWindowPartContainerStackModel.js";

export default class EclipseAppModel extends NobucaAppModel {

    constructor() {
        super();
        this.setTitle("Eclipse");
        this.createWindow();
    }

    getClassName() {
        return "EclipseAppModel";
    }

    createWindow() {
        this.window = new EclipseWindowModel();

        var left = new EclipseWindowPartContainerStackModel();

        var rightTop = new EclipseWindowPartContainerStackModel();

        var rightBottom = new EclipseWindowPartContainerStackModel();
        
        var right = new EclipsePartContainerSashTopBottomModel(rightTop, rightBottom, .7);

        this.getWindow().setPartContiner(new EclipsePartContainerSashLeftRightModel(left, right, .3));
    }

    getWindow() {
        return this.window;
    }
}