import BlenderWorkspaceModel from "./BlenderWorkspaceModel.js";
import NobucaPanelSplitLeftRightModel from "../../../../nobuca-core/split/NobucaPanelSplitLeftRightModel.js";
import NobucaPanelSplitTopBottomModel from "../../../../nobuca-core/split/NobucaPanelSplitTopBottomModel.js";
import BlenderEditorContainerModel from "../editor/BlenderEditorContainerModel.js";

export default class BlenderWorkspaceUvEditingModel extends BlenderWorkspaceModel {

    constructor() {
        super();

        this.setId("uvEditing");
        this.setTitle("UV Editing");

        var uvEditor = new BlenderEditorContainerModel("uv");

        var threeDViewport = new BlenderEditorContainerModel("3dViewport");

        var outliner = new BlenderEditorContainerModel("outliner");

        var properties = new BlenderEditorContainerModel("properties");

        var split1 = new NobucaPanelSplitTopBottomModel(outliner, properties, .35);

        var split2 = new NobucaPanelSplitLeftRightModel(threeDViewport, split1, .7);

        var split3 = new NobucaPanelSplitLeftRightModel(uvEditor, split2, .45);

        this.addChild(split3);
    }
}