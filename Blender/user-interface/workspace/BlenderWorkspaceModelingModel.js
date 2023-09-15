import BlenderWorkspaceModel from "./BlenderWorkspaceModel.js";
import NobucaPanelModel from "../../../../nobuca-core/panel/NobucaPanelModel.js";
import NobucaPanelSplitLeftRightModel from "../../../../nobuca-core/panel-split/NobucaPanelSplitLeftRightModel.js";
import NobucaPanelSplitTopBottomModel from "../../../../nobuca-core/panel-split/NobucaPanelSplitTopBottomModel.js";
import BlenderEditorContainerModel from "../editor/BlenderEditorContainerModel.js";

export default class BlenderWorkspaceModelingModel extends BlenderWorkspaceModel {

    constructor() {
        super();

        this.setId("modeling");
        this.setTitle("Modeling");

        var threeDViewport = new NobucaPanelModel();
        threeDViewport.setId("threeDViewport");
        threeDViewport.addChild(new BlenderEditorContainerModel("3dViewport"));

        var outliner = new NobucaPanelModel();
        outliner.setId("outliner");
        outliner.addChild(new BlenderEditorContainerModel("outliner"));

        var properties = new NobucaPanelModel();
        properties.setId("properties");
        properties.addChild(new BlenderEditorContainerModel("properties"));
        
        var split1 = new NobucaPanelSplitTopBottomModel(outliner, properties, .3);

        var split2 = new NobucaPanelSplitLeftRightModel(threeDViewport, split1, .85);
        this.addChild(split2);
    }
}