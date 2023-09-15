import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";

export default class BlenderWorkspaceModel extends NobucaPanelModel {
   
    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }
}