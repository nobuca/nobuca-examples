import BlenderWorkspaceModel from "./BlenderWorkspaceModel.js";
import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";
import NobucaPanelSplitLeftRightModel from "../../../../nobuca-core/panel-split/NobucaPanelSplitLeftRightModel.js";
import NobucaPanelSplitTopBottomModel from "../../../../nobuca-core/panel-split/NobucaPanelSplitTopBottomModel.js";
import BlenderEditorContainerModel from "../../window-system/editor/BlenderEditorContainerModel.js";

export default class BlenderWorkspace3DViewportModel extends BlenderWorkspaceModel {

    constructor() {
        super();

        this.setId("layout");
        this.setTitle("Layout");

        var threeDViewport = new NobucaPanelModel();
        threeDViewport.setId("threeDViewport");
        threeDViewport.addChild(new BlenderEditorContainerModel("3dViewport"));

        var timeline = new NobucaPanelModel();
        timeline.setId("timeline");
        timeline.addChild(new BlenderEditorContainerModel("timeline"));

        var outliner = new NobucaPanelModel();
        outliner.setId("outliner");
        outliner.addChild(new BlenderEditorContainerModel("outliner"));

        var properties = new NobucaPanelModel();
        properties.setId("properties");
        properties.addChild(new BlenderEditorContainerModel("properties"));

        var split1 = new NobucaPanelSplitTopBottomModel(threeDViewport, timeline, .7);

        var split2 = new NobucaPanelSplitTopBottomModel(outliner, properties, .3);
    
        var split3 = new NobucaPanelSplitLeftRightModel(split1, split2, .85);
        this.addChild(split3);
    }
}