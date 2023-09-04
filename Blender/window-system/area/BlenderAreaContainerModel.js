import NobucaPanelModel from "../../../../nobuca-core/panel-resizable/NobucaPanelResizableModel.js";

export default class BlenderAreaContainerModel extends NobucaPanelResizableModel {

    constructor() {
        super();
        this.areas = [];
    }

    getAreas() {
        return this.areas;
    }

    addArea(area) {
        this.getAreas().push(area);
        this.addChild(area);
    }

}