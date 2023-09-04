import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";

export default class BlenderWorkspaceModel extends NobucaPanelModel {

    constructor() {
        super();
        this.areas = [];
    }

    getAreas() {
        return this.areas;
    }

    addArea(area) {
        this.areas.push(area);
        this.addChild(area);
    }
    
    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }
}