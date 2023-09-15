import BlenderWorkspaceModel from "./BlenderWorkspaceModel.js";
import NobucaPanelSplitLeftRightModel from "../../../../nobuca-core/panel-split/NobucaPanelSplitLeftRightModel.js";
import NobucaPanelSplitTopBottomModel from "../../../../nobuca-core/panel-split/NobucaPanelSplitTopBottomModel.js";
import BlenderEditorContainerModel from "../editor/BlenderEditorContainerModel.js";

export default class BlenderWorkspaceLayoutModel extends BlenderWorkspaceModel {

    constructor() {
        super();

        this.setId("layout");
        this.setTitle("Layout");

        var threeDViewport = new BlenderEditorContainerModel("3dViewport");

        var timeline = new BlenderEditorContainerModel("console");

        var outliner = new BlenderEditorContainerModel("outliner");

        var properties = new BlenderEditorContainerModel("properties");

        var split1 = new NobucaPanelSplitTopBottomModel(threeDViewport, timeline, .7);

        var split2 = new NobucaPanelSplitTopBottomModel(outliner, properties, .3);
    
        var split3 = new NobucaPanelSplitLeftRightModel(split1, split2, .85);
        this.addChild(split3);
    }
}