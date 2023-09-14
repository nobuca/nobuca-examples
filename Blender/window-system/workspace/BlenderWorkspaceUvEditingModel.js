import BlenderWorkspaceModel from "./BlenderWorkspaceModel.js";
import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";
import NobucaPanelSplitLeftRightModel from "../../../../nobuca-core/panel-split/NobucaPanelSplitLeftRightModel.js";
import NobucaPanelSplitTopBottomModel from "../../../../nobuca-core/panel-split/NobucaPanelSplitTopBottomModel.js";
import BlenderEditorContainerModel from "../editor/BlenderEditorContainerModel.js";

export default class BlenderWorkspaceUvEditingModel extends BlenderWorkspaceModel {

    constructor() {
        super();

        this.setId("uvEditing");
        this.setTitle("UV Editing");

        var uvEditor = new NobucaPanelModel();
        uvEditor.setId("uvEditor");
        uvEditor.addChild(new BlenderEditorContainerModel("uv"));

        var threeDViewport = new NobucaPanelModel();
        threeDViewport.setId("threeDViewport");
        threeDViewport.addChild(new BlenderEditorContainerModel("3dViewport"));

        var outliner = new NobucaPanelModel();
        outliner.setId("areaColumnRightTop");
        outliner.addChild(new BlenderEditorContainerModel("outliner"));

        var properties = new NobucaPanelModel();
        properties.setId("areaColumnRightBottom");
        properties.addChild(new BlenderEditorContainerModel("properties"));

        var split1 = new NobucaPanelSplitTopBottomModel(outliner, properties, .35);

        var split2 = new NobucaPanelSplitLeftRightModel(threeDViewport, split1, .7);

        var split3 = new NobucaPanelSplitLeftRightModel(uvEditor, split2, .45);

        this.addChild(split3);
    }
}