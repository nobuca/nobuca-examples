import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";

export default class BlenderEditorRegionHeaderModel extends NobucaPanelModel {

    constructor() {
        super();
        this.createLeftSide();
        this.createCenterSide();
        this.createRightSide();
    }

    createLeftSide() {
        this.leftSide = new NobucaPanelModel();
        this.addChild(this.leftSide);
    }

    getLeftSide() {
        return this.leftSide;
    }

    createCenterSide() {
        this.centerSide = new NobucaPanelModel();
        this.addChild(this.centerSide);
    }

    getCenterSide() {
        return this.centerSide;
    }

    createRightSide() {
        this.rightSide = new NobucaPanelModel();
        this.addChild(this.rightSide);
    }

    getRightSide() {
        return this.rightSide;
    }

   
}